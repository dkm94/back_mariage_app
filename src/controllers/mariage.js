const Wedding = require("../models/mariage");

exports.mariage = (req, res) => {
    const mariageId = res.locals.mariageID;
    Wedding.findOne({ _id: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}