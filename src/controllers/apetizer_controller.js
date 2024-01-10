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

exports.apetizers = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const apetizers = await Apetizer.find({ mariageID })
        
        if(!apetizers){
            res.send({ success: false, message: "Impossible de charger les apéritifs du menu", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: apetizers, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
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
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json ({ err }))
}
