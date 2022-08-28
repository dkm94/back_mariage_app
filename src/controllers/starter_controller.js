const Starter = require('../models/menu-entrée');

exports.newStarter = (req, res) => {
    const mariageId = res.locals.mariageID;
    let starter = new Starter ({
        ...req.body,
        mariageID: mariageId
    });
    starter.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.starters = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Starter.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateStarter = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Starter.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteStarter = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Starter.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json ({ err }))
}
