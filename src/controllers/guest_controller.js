const Wedding = require('../models/mariage');
const Guest = require('../models/invite');
const Table = require('../models/table');
// const generator = require('generate-password');

const getGuest = async (id) => {
    const guest = await Guest.findOne({ _id: id })
    return guest
}

const getTableById = async (id) => {
    const table = await Table.findOne({ _id: id })
    return table
}

exports.newGuest = async (req, res, next) => {
    try {
        const mariageId = res.locals.mariageID;

        let guest = new Guest({
            ...req.body,
            media: "",
            tableID: null,
            mariageID: mariageId
        });

        const newGuest = await guest.save();

        await Wedding.updateOne({ _id: mariageId }, { $push: { guestID: newGuest }});

        res.status(200).json({ success: true, data: newGuest });
    } catch (err) {
        res.status(400).json({ success: false, message: "Erreur serveur" });
    }
}

exports.guest = async (req, res, next) => {
    try {
        const guest = await Guest.findOne({ _id: req.params.id })
            .populate({ path: "tableID", select: "name" })
            .exec();
        
            if(!guest){
                res.status(404).json({ success: false, message: "Invité introuvable" })
                return;
            }

        res.status(200).json({ success: true, data: guest });
    } catch (err) {
        res.status(400).json({ success: false, message: "Erreur serveur"});
    }
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
            res.status(404).json({ success: false, message: "Invités introuvables !" })
            return;
        }

        res.status(200).json({ success: true, data: guests });
    } catch (err) {
        res.status(500).json({ success: false, message: "Echec serveur" })
    }
}

exports.updateGuest = async (req, res) => {
    try {
        const guest = await getGuest(req.params.id);
        if (!guest) {
            res.status(404).json({ success: false, message: "Invité introuvable !" });
            return;
        }

        const mariageId = res.locals.mariageID;
        let updateFields = { ...req.body, mariageID: mariageId };

        if (req.file) {
            updateFields.media = req.file.filename;
        }

        const options = { new: true };
        const result = await Guest.updateOne({ _id: req.params.id }, { $set: updateFields }, options);

        if (result.nModified === 0) {
            res.status(422).json({ success: false, message: "Oups, une erreur est survenue lors de la modification de l'invité" });
            return;
        }

        res.status(200).json({ success: true, message: "Modifications enregistrées"});
    } catch (err) {
        res.status(400).json({ success: false, message: "Erreur serveur" });
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
            res.status(404).json({ success: false, message: "Invité introuvable !" })
            return;
        }

        const result = await Guest.deleteOne({ _id: id, mariageID: mariageId });
        const { deletedCount } = result;
        if (!deletedCount) {
        res.status(404).json({ success: false, message: "Echec lors de la suppression de l'invité" });
        return;
        }

        res.status(200).json({ success: true, message: "L'invité a bien été supprimé" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Echec serveur" })
    }
}

exports.updateTableWithGuests = async (req, res, next) => { 
    const mariageID = res.locals.mariageID;
    const arrayOfGuests = req.body.guestIds;
    const tableID = req.params.id;
    
    // Supprimer d'éventuels doublons dans le tableau d'invités
    const guestIds = [...new Set(arrayOfGuests)];
    
    try {
        // Est-ce que la table existe ?
        const table = await getTableById(tableID);
        if (!table) {
            res.status(404).json({ success: false, message: "Table introuvable !", statusCode: 404 });
            return;
        }        
        
        // La table existe
        // Si la table est vide, on récupère tous les invités qui y étaient et on leur donne une valeur tableID null
        if(guestIds.length === 0) {
            const guestsToDeleteFromTable = await Guest.find({ tableID });
            const promises = guestsToDeleteFromTable.map(guest => {
                return Guest.updateOne(
                    { _id: guest._id },
                    { $set: { tableID: null } }
                    );
                });
                await Promise.all(promises);
            } else { // Si la table contient des invités
                
                // 1) Est-ce que les invités existent ?
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

            // 2) Vérifier que les invités ne sont pas déjà placés sur une autre table
            const guestsWithTable = existingGuests.filter(guest => guest && guest.tableID && guest.tableID.toString() !== tableID);
            if (guestsWithTable.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Erreur: les invités suivants sont déjà installés sur une autre table: ${guestsWithTable.map(guest => guest.name).join(', ')}`,
                    statusCode: 400
                });
            }
            
            // 4) Mette à jour les invités avec leur nouvelle table
            const updatePromises = existingGuests.map(guest => {
                return Guest.updateOne(
                    { _id: guest._id },
                    { $set: { tableID, mariageID } }
                );
            }); 
            await Promise.all(updatePromises);


        }
        // 5) Mettre à jour la table avec les nouveaux invités // ça ne marche pas
        const result = await Table.updateOne({ _id: tableID }, { $set: { guestID: guestIds }})
        if (!result.ok) {
            res.status(422).json({ success: false, message: "Echec de la modification de la table", statusCode: 422 });
            return;
        }
        
        res.status(200).json({ success: true, message: "La liste des invités a bien été modifiée", statusCode: 200 });
    } catch (err) {
        res.status(500).json({ success: false, message: "Echec serveur", statusCode: 500 });
    }
}