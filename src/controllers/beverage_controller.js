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

exports.beverages = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const beverages = await Beverage.find({ mariageID })
        
        if(!beverages){
            res.send({ success: false, message: "Impossible de charger les boissons du menu", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: beverages, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
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
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json ({ err }))
}
