const Beverage = require("../models/menu-boisson");

exports.newBeverage = (req, res) => {
    const mariageId = res.locals.mariageID;
    let beverage = new Beverage ({
        ...req.body,
        mariageID: mariageId
    });
    beverage.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.beverages = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Beverage.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateBeverage = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Beverage.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteBeverage = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Beverage.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
        if(data.deletedCount == 1){
            return data;
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}
