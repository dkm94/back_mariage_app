const Menu = require('../models/menu');
const Starter = require('../models/menu-entrée');


// //ENTREE
exports.newStarter = (req, res) => {
    const mariageId = res.locals.mariageID;
    let starter = new Starter ({
        ...req.body,
        menuID: req.params.id,
        mariageID: mariageId
    });
    starter.save()
        .then(newStarter => {
            Menu.updateOne({_id: req.params.id, mariageID: mariageId},
                {$push: {starterID: newStarter._id}})
                .then(data => res.status(200).json(newStarter))
        })
        .catch(err => res.status(400).json({err}))
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
        .then(data => {
        if(data.deletedCount == 1){
            Menu.updateMany({mariageID: mariageId}, {$pull: {starterID: req.params.id}})
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json(err))
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}
