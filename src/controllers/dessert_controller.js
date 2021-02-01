const Menu = require('../models/menu');
const Dessert = require('../models/menu-dessert');

exports.newDessert = (req, res) => {
    const mariageId = res.locals.mariageID;
    let dessert = new Dessert ({
        ...req.body,
        menuID: req.params.id,
        mariageID: mariageId
    });
    dessert.save()
        .then(newDessert => {
            if(!dessert){
                res.status(400).json("Erreur création menu")
            } else {
                Menu.updateOne({_id: req.params.id, mariageID: mariageId},
                    {$push: {dessertID: newDessert._id}})
                    .then(data => res.status(200).json({ data}))
                    .catch(err => res.status(400).json({err}))
            }
        })
        .catch(err => res.status(400).json({err}))
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
        .then(data => {
        console.log(data.deletedCount)
        if(data.deletedCount == 1){
            Menu.updateMany({mariageID: mariageId}, {$pull: {dessertID: req.params.id}})
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json(err))
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}