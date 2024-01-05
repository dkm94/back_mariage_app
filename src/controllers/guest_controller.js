const Wedding = require('../models/mariage');
const Guest = require('../models/invite');
const Table = require('../models/table');
const generator = require('generate-password');

const getGuest = async (id) => {
    const guest = await Guest.findOne({ _id: id })
    return guest
}

const getTableById = async (id) => {
    const table = await Table.findOne({ _id: id })
    return table
}

exports.newGuest = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    // let generatedpsw = generator.generate({
    //     length: 10,
    //     numbers: true
    // });
    let guest = new Guest ({
        ...req.body,
        // email: null,
        // password: generatedpsw,
        media: "",
        guestMenu: {
            starter: null,
            maincourse: null,
            dessert: null
        },
        tableID: null,
        mariageID: mariageId
    });
    guest.save()
        .then(newGuest => {
            Wedding.updateOne({_id: mariageId},
                {$push: {guestID: newGuest}})
                .then(data => res.status(200).json(newGuest))
        })
        .catch(err => res.status(400).json(err))
}

exports.guest = (req, res, next) => {
    Guest.findOne({ _id: req.params.id })
        .populate({path: "tableID", select: "name"})
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.getGuestbyName = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.find({ name: req.query.name, mariageID: mariageId })
        .populate({path: "tableID", select: "name"})
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.guests = async (req, res, next) => {
    const { locals } = res;
    const mariageId = locals.mariageID;

    try {
        const guests = await Guest.find({ mariageID: mariageId })
        
        if(!guests){
            res.send({ success: false, message: "Invités introuvables !", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: guests, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
}

exports.updateGuest = (req, res) => {
    const mariageId = res.locals.mariageID;
    if(req.file){
        Guest.findOneAndUpdate({ _id: req.params.id },
            {$set: {...req.body, media: req.file.filename, mariageID: mariageId}},
            {new: true}, (err, doc) => {
                if(err) {
                    console.log(err)
                } else {
                    return res.status(200).json(doc)
                }
            })
    } else {
        Guest.findOneAndUpdate({ _id: req.params.id },
            {$set: {...req.body, mariageID: mariageId}},
            {new: true}, (err, doc) => {
                if(err) {
                    console.log(err)
                } else {
                    return res.status(200).json(doc)
                }
            })
    }
}

exports.deleteGuest = async (req, res) => {
    const { locals } = res;
    const { params } = req;
    const mariageId = locals.mariageID;
    const id = params.id;

    try {
        const guest = await getGuest(id)
        if(!guest){
            res.send({ success: false, message: "Invité introuvable !", statusCode: 404 })
            return;
        }

        const result = await Guest.deleteOne({ _id: id, mariageID: mariageId });
        const { deletedCount } = result;
        if (!deletedCount) {
        res.send({ success: false, message: "Echec lors de la suppression de l'invité", statusCode: 404 });
        return;
        }

        res.send({ success: true, message: "L'invité a bien été supprimé", statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
}

exports.addGuestToTable = async (req, res, next) => { // update la table précédente
    const mariageID = res.locals.mariageID;
    const guestIds = req.body.guestIds;
    const tableID = req.params.id;

    try {
        // Vérifier l'existence des guests
        const existingGuests = await Guest.find({ _id: { $in: guestIds } });
        // Filtrer les IDs des guests qui existent réellement
        const existingGuestIds = existingGuests.map(guest => guest._id.toString());
        // Filtrer les IDs des guests qui n'existent pas
        const nonExistingGuestIds = guestIds.filter(guestId => !existingGuestIds.includes(guestId));
        if (nonExistingGuestIds.length > 0) {
            return res.status(404).json({
                success: false,
                message: `Erreur: les invités avec les IDs suivants sont introuvables: ${nonExistingGuestIds.join(', ')}`,
                statusCode: 404
            });
        }

        // Effectuer les mises à jour uniquement pour les guests existants
        const updatePromises = existingGuests.map(guest => {
            return Guest.updateOne(
                { _id: guest._id },
                { $set: { tableID, mariageID } }
            );
        });
        await Promise.all(updatePromises);

        const tablesToUpdate = await Table.find({ guestID: { $in: guestIds } });

        // retirer les invités de leur précédente table
        tablesToUpdate.forEach(async (table) => {
            const updatedGuestIDs = table.guestID.filter(id => !guestIds.includes(id.toString()));
            await Table.updateOne({ _id: table._id }, { $set: { guestID: updatedGuestIDs } });
        });

        const table = await getTableById(tableID);
        if (!table) {
            res.status(404).json({ success: false, message: "Table introuvable !", statusCode: 404 });
            return;
        }
        const result = await Table.updateOne({ _id: table._id }, {$set: {guestID: guestIds}})
        if (!result.ok) {
            res.status(400).json({ success: false, message: "Echec de la modification de la table", statusCode: 400 });
            return;
        }

        res.status(200).json({ success: true, message: "La liste des invités a bien été modifiée", statusCode: 200 });
    } catch (err) {
        res.status(500).json({ success: false, message: "Echec serveur", statusCode: 500 });
    }
}