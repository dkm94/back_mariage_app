const Apetizer = require("../models/menu-aperitif");

exports.newApetizer = (req, res) => {
    const mariageId = res.locals.mariageID;
    let apetizer = new Apetizer ({
        ...req.body,
        mariageID: mariageId
    });
    apetizer.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.apetizers = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Apetizer.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateApetizer = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Apetizer.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteApetizer = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Apetizer.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
        if(data.deletedCount == 1){
            return data;
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}
