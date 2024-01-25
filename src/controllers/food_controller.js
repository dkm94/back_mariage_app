const Food = require('../models/food');

const findFoodById = async (id) => {
    const food = await Food.findById({ _id: id })
    return food;
} 

function isValidCategory(category) {
    const validCategories = ["apetizer", "starter", "maincourse", "dessert", "beverage"];
    return validCategories.includes(category);
}

exports.newFood = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;
        const { name, category } = req.body;

        if (!isValidCategory(category)) {
            return res.status(400).json({ success: false, message: "Catégorie invalide" });
        }

        let food = new Food({
            name,
            category,
            mariageID: mariageId
        });

        const data = await food.save();

        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, l'élément n'a pas été créé..."});
    }
}

exports.foods = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const food = await Food.find({ mariageID })
        
        if(!food){
            res.status(404).json({ success: false, message: "Impossible de charger les boissons du menu" })
            return;
        }

        res.status(200).json({ success: true, data: food });
    } catch (err) {
        res.status(200).json({ success: false, message: "Echec serveur" })
    }
}

exports.updateFood = async (req, res, next) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingFood = await findFoodById(req.params.id);
        if (!existingFood) {
            return res.status(404).json({ success: false, message: "L'élément sélectionné n'existe pas" });
        }

        const result = await Food.updateOne(
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

exports.deleteFood = async (req, res, next) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingFood = await findFoodById(req.params.id);
        if (!existingFood) {
            return res.status(404).json({ success: false, message: "L'élément sélectionné n'existe pas" });
        }

        const result = await Food.deleteOne({ _id: req.params.id, mariageID: mariageId });

        if (result.deletedCount === 0) {
            return res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression du l'élément" });
        }

        res.status(200).json({ success: true, message: "Element supprimé" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression de l'élément" });
    }
}
