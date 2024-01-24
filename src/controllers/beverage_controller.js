const Beverage = require("../models/menu-boisson");

const findBeverageById = async (id) => {
    const beverage = await Beverage.findById({ _id: id })
    return beverage;
} 

exports.newBeverage = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;

        let beverage = new Beverage({
            ...req.body,
            mariageID: mariageId
        });
        const data = await beverage.save();

        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, l'élément n'a pas été créé..."});
    }
}

exports.beverages = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const beverages = await Beverage.find({ mariageID })
        
        if(!beverages){
            res.status(404).json({ success: false, message: "Impossible de charger les boissons du menu" })
            return;
        }

        res.status(200).json({ success: true, data: beverages });
    } catch (err) {
        res.status(200).json({ success: false, message: "Echec serveur" })
    }
}

exports.updateBeverage = async (req, res, next) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingBeverage = await findBeverageById(req.params.id);
        if (!existingBeverage) {
            return res.status(404).json({ success: false, message: "L'élément sélectionné n'existe pas" });
        }

        const result = await Beverage.updateOne(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id, mariageID: mariageId }
        );

        if (result.nModified === 1) {
            res.status(200).json({ success: true, message: "Modification enregistrée" });
        } else {
            res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la modification de l'élément." });
        }

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: "Erreur serveur" });
    }
}

exports.deleteBeverage = async (req, res, next) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingBeverage = await findBeverageById(req.params.id);
        if (!existingBeverage) {
            return res.status(404).json({ success: false, message: "L'élément sélectionné n'existe pas" });
        }

        const result = await Beverage.deleteOne({ _id: req.params.id, mariageID: mariageId });

        if (result.deletedCount === 0) {
            return res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression du l'élément" });
        }

        res.status(200).json({ success: true, message: "Element supprimé" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression de l'élément" });
    }
}
