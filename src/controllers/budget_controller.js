const Operation = require("../models/budget_operation");

const findOperationById = async (id) => {
    const operation = await Operation.findById({ _id: id })
    return operation;
}   

exports.operations = async (req, res) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const operations = await Operation.find({ mariageID })
        
        if(!operations){
            res.send({ success: false, message: "Impossible de charger votre journal d'opérations", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: operations, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
}

exports.operation = async (req, res) => {
    try {
        const data = await Operation.findOne({ _id: req.params.id });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message || "Oups, une erreur s'est produite lors de la récupération de l'opération" });
    }
}

exports.newOperation = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;
        let operation = new Operation({
            ...req.body,
            price: req.body.price * 100,
            mariageID: mariageId
        });

        const data = await operation.save();
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message || "Oups, une erreur s'est produite lors de la création de l'opération" });
    }
}

exports.updateOperation = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;
        
        const existingOperation = await findOperationById(req.params.id);
        if (!existingOperation) {
            return res.status(404).json({ success: false, message: "L'opération n'existe pas." });
        }

        const { category, description, price } = req.body;
        const validCategories = [
            'Locations', 'Habillement/Beauté', 'Décoration/Fleurs', 'Alliances/Bijoux', 'Animation', 'Traiteur', 'Faire-part', 'Autres'
        ];

        if (!category || !validCategories.includes(category) || !description || typeof price !== 'number') {
            return res.status(400).json({ err: "Tous les champs doivent être valides." });
        }

        const result = await Operation.updateOne(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id, mariageID: mariageId }
        );

        if (todoDeleteResult.nModified === 1) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Erreur lors de la suppression du todo." });
        }

    } catch (err) {
        res.status(400).json({ success: false, message: err.message || "Oups, une erreur s'est produite lors de la mise à jour de l'opération." });
    }
}

exports.deleteOperation = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;
        const result = await Operation.deleteOne({ _id: req.params.id, mariageID: mariageId });

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message || "Oups, une erreur s'est produite lors de la suppression de l'opération" });
    }
}
