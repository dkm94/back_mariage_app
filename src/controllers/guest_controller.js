const Wedding = require('../models/mariage');
const Guest = require('../models/invite');
const generator = require('generate-password');

exports.newGuest = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    let generatedpsw = generator.generate({
        length: 10,
        numbers: true
    });
    let guest = new Guest ({
        ...req.body,
        email: null,
        password: generatedpsw,
        media: "avatar.jpg",
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
            if(!guest) {
                res.status(400).json(err)
            } else {
                Wedding.updateOne({ _id: mariageId },
                    {$push: {guestID: newGuest}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(400).json(err))
}

exports.guest = (req, res, next) => {
    // console.log("query", req.query)
    Guest.findOne({ _id: req.params.id })
        .populate({path: "tableID", select: "name"})
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.getGuestbyName = (req, res, next) => {
    console.log("query", req.query)
    Guest.findOne({ name: req.params.name })
        .populate({path: "tableID", select: "name"})
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

// exports.getGuestbyName = (req, res, next) => {
//     const mariageId = res.locals.mariageID;
//     console.log("query", req.query)
//     Guest.find({ name: req.query.name })
//         .populate({path: "tableID", select: "name"})
//         .exec()
//         .then(data => res.status(200).json(data))
//         .catch(err => res.status(400).json( err ))
// }

exports.guests = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    console.log("guests!")
    Guest.find({ })
        .populate({path: "tableID", select: "name"})
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateGuest = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.updateOne({ _id: req.params.id},
        {$set: {...req.body, _id: req.params.id, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
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