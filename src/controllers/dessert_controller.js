const Dessert = require('../models/menu-dessert');

const findBeverageById = async (id) => {
    const beverage = await Beverage.findById({ _id: id })
    return beverage;
}

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

exports.desserts = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const desserts = await Dessert.find({ mariageID })
        
        if(!desserts){
            res.send({ success: false, message: "Impossible de charger les desserts du menu", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: desserts, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
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
