const Menu = require("../models/menu-invité");

exports.menu = (req, res, next) => {
    const menuId = res.locals.menuID;
    Menu.findOne({ _id: menuId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}