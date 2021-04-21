const Wedding = require('../models/mariage');
const Guest = require('../models/invite');
const generator = require('generate-password');

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
            if(guest) {
                Wedding.updateOne({_id: mariageId},
                    {$push: {guestID: newGuest}})
                    .then(newGuest => res.status(200).json(newGuest))
                    .catch(err => res.status(400).json(err))
            } else
                res.status(400).json(err)
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
    Guest.findOne({ name: req.params.name })
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
        Guest.updateOne({ _id: req.params.id },
            {$set: {...req.body, media: req.file.filename, mariageID: mariageId}})
            .then(data => res.status(200).json(data))
            .catch(err => res.status(400).json( err ))
    } else {
        Guest.updateOne({ _id: req.params.id },
            {$set: {...req.body, mariageID: mariageId}})
            .then(data => res.status(200).json(data))
            .catch(err => res.status(400).json( err ))
    }
}

exports.deleteGuest = (req, res) => {
    const mariageId = res.locals.mariageID;
    Wedding.updateOne({ _id: mariageId }, {$pull: {guestID: req.params.id}})
    .then(data => {
            if(data.nModified === 1){
                Guest.deleteOne({ _id: req.params.id })
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            } else
                return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json(err))
}