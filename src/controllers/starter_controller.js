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

exports.starters = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const starters = await Starter.find({ mariageID })
        
        if(!starters){
            res.send({ success: false, message: "Impossible de charger les entrées du menu", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: starters, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
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
