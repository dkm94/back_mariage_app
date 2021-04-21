const Admin = require('../models/admin');
const Table = require('../models/table');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Guest = require('../models/invite');
const GuestMenu = require('../models/menu-invité');
const Menu = require('../models/menu');
const Starter = require('../models/menu-entrée');
const Maincourse = require('../models/menu-plat');
const Dessert = require('../models/menu-dessert');
const generator = require('generate-password');
const bcrypt = require('bcrypt');

// const deleteUser = require("../middlewares/delete.user.cascade")

exports.admin = (req, res) => {
    const adminId = res.locals.adminId;
    Admin.findOne({_id: adminId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateAdmin = (req, res) => {
    const adminId = res.locals.adminId;
    const mariageId = res.locals.mariageID;
    let hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    Admin.updateOne({_id: adminId},
        {$set: {password: hash, ...req.body, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.deleteAccount =  function (req, res, next) {
    const adminId = res.locals.adminId;
    Admin.findById(adminId).exec()
        .then(admin => {
            if(!admin) return res.status(400).json(err)
            admin.remove()
                .then(() => res.status(200).json("Le compte a été supprimé avec succès."))
                .catch(err => res.status(400).json(err))
        })
}
