const Maincourse = require("../models/menu-plat")

exports.newMaincourse = (req, res) => {
    const mariageId = res.locals.mariageID;
    let maincourse = new Maincourse ({
        ...req.body,
        mariageID: mariageId
    });
    maincourse.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
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
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json ({ err }))
}
