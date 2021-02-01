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
// const deleteUser = require("../middlewares/delete.user.cascade")

//Fonction front pour compter le nombre de plats 

//RUD admin
exports.admin = (req, res) => {
    const adminId = res.locals.adminId;
    Admin.findOne({_id: adminId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateAdmin = (req, res) => {
    const adminId = res.locals.adminId;
    const mariageId = res.locals.mariageID;
    Admin.updateOne({_id: adminId},
        {$set: {...req.body, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

// // exports.deleteAccount =  function (req, res, next) {
// //     jwt.verify(req.token, jwt_secret, function(err, decoded) {
// //         if (err)
// //             res.status(400).json("Accès restreint.")
// //         else {
// //             Mariage.remove()
// //                 .then(data => res.status(200).json(data))
// //                 .catch(err => res.status(400).json({ err}))
// //             }
// //         }
// //     );
// // }
