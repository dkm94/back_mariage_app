const Wedding = require('../models/mariage');
const Guest = require('../models/invite');
const generator = require('generate-password');

const getGuest = async (id) => {
        const guest = await Guest.findOne({ _id: id })
        return guest
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

exports.guests = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
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

exports.deleteGuest = async (res) => {
    const { locals, params } = res;
    const mariageId = locals.mariageID;
    const id = params.id;
    try {
        const guest = await getGuest(id)
        if(!guest){
            res.status(404).send({ success: false, message: "Invité introuvable !" })
            return;
        }

        const result = await Guest.deleteOne({ _id: id, mariageID: mariageId });
        const { deletedCount } = result;
        if (!deletedCount) {
        res.status(404).send({ success: false, message: "Echec lors de la suppression de l'invité" });
        return;
        }

        res.status(204).send({ success: true, message: "L'invité a bien été supprimé" });
    } catch (err) {
        res.status(500).send({ success: false, message: "Echec serveur" })
    }
}

exports.addGuestToTable = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.updateOne({ _id: req.params.id },
        {$set: {tableID: req.body.tableID, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.deleteGuestFromTable = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.updateOne({ _id: req.params.id },
        {$set: {tableID: null, mariageID: mariageId}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => res.status(400).json({ err}))
}