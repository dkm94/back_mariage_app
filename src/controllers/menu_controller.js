
const Menu = require('../models/menu');

exports.weddingMenu = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Menu.findOne({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}