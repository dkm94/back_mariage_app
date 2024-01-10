const Wedding = require("../models/mariage");

exports.mariage = async (req, res) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const userWedding = await Wedding.findOne({ _id: mariageID })
        
        if(!userWedding){
            res.send({ success: false, message: "Impossible de charger les données du mariage", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: userWedding, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
}

exports.updateMariage = (req, res) => {
    const mariageId = res.locals.mariageID;
    Wedding.updateOne({ _id: mariageId },
        {$set: {...req.body, _id: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}