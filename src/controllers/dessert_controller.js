const Dessert = require('../models/menu-dessert');

exports.newDessert = (req, res) => {
    const mariageId = res.locals.mariageID;
    let dessert = new Dessert ({
        ...req.body,
        mariageID: mariageId
    });
    dessert.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.desserts = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Dessert.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateDessert = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Dessert.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteDessert = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Dessert.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}
