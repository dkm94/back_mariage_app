const Menu = require('../models/menu');
const Maincourse = require("../models/menu-plat")

exports.newMaincourse = (req, res) => {
    const mariageId = res.locals.mariageID;
    let maincourse = new Maincourse ({
        ...req.body,
        menuID: req.params.id,
        mariageID: mariageId
    });
    maincourse.save()
        .then(newMaincourse => {
            Menu.updateOne({_id: req.params.id, mariageID: mariageId},
                {$push: {maincourseID: newMaincourse._id}})
                .then(data => res.status(200).json(newMaincourse))
        })
        .catch(err => res.status(400).json({err}))
}

exports.maincourses = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Maincourse.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateMaincourse = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Maincourse.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteMaincourse = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Maincourse.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
        if(data.deletedCount == 1){
            Menu.updateMany({mariageID: mariageId}, {$pull: {maincourseID: req.params.id}})
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json(err))
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}
