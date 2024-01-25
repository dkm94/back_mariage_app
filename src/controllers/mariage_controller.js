const Wedding = require("../models/mariage");

exports.mariage = async (req, res) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const userWedding = await Wedding.findOne({ _id: mariageID })
        
        if(!userWedding){
            res.status(404).json({ success: false, message: "Impossible de charger les données du mariage" })
            return;
        }

        res.status(200).json({ success: true, data: userWedding });
    } catch (err) {
        res.status(500).json({ success: false, message: "Echec serveur" })
    }
}

exports.updateMariage = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingWedding = await Wedding.findById(mariageId);
        if (!existingWedding) {
            return res.status(404).json({ success: false, error: 'Informations du mariage introuvables' });
        }

        const result = await Wedding.updateOne(
            { _id: mariageId },
            { $set: { ...req.body, _id: mariageId } }
        );

        if (result.nModified === 0) {
            res.status(400).json({ success: false, message: "Oups, une erreur s'est produite. Les données n'ont pas été sauvegardées" });
        } 
        
        res.status(200).json({ success: true, message: "Modifications enregistrées" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Erreur serveur" });
    }
};
