const Apetizer = require("../models/menu-aperitif");

const findApetizerById = async (id) => {
    const apetizer = await Apetizer.findById({ _id: id })
    return apetizer;
} 

exports.newApetizer = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;

        let apetizer = new Apetizer({
            ...req.body,
            mariageID: mariageId
        });
        const data = await apetizer.save();

        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, l'élément n'a pas été créé..."});
    }
};

exports.apetizers = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const apetizers = await Apetizer.find({ mariageID })
        
        if(!apetizers){
            res.status(404).json({ success: false, message: "Impossible de charger les apéritifs du menu" })
            return;
        }

        res.status(200).json({ success: true, data: apetizers });
    } catch (err) {
        res.status(200).json({ success: false, message: "Echec serveur" })
    }
}

exports.updateApetizer = async (req, res, next) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingApetizer = await findApetizerById(req.params.id);
        if (!existingApetizer) {
            return res.status(404).json({ success: false, message: "L'élément sélectionné n'existe pas" });
        }

        const result = await Apetizer.updateOne(
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

exports.deleteApetizer = async (req, res, next) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingApetizer = await findApetizerById(req.params.id);
        if (!existingApetizer) {
            return res.status(404).json({ success: false, message: "L'élément sélectionné n'existe pas" });
        }

        const result = await Apetizer.deleteOne({ _id: req.params.id, mariageID: mariageId });

        if (result.deletedCount === 0) {
            return res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression du l'élément" });
        }

        res.status(200).json({ success: true, message: "Element supprimé" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression de l'élément" });
    }
}
