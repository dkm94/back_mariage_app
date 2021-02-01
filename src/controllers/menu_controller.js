
const Menu = require('../models/menu');

exports.weddingMenu = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Menu.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}