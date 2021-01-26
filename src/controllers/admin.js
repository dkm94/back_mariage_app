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
const jwt_secret = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
// const deleteUser = require("../middlewares/delete.user.cascade")

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

//
exports.mariage = (req, res) => {
    const mariageId = res.locals.mariageID;
    Mariage.findOne({ _id: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.updateMariage = (req, res) => {
    const mariageId = res.locals.mariageID;
    Mariage.updateOne({ _id: mariageId },
        {$set: {...req.body, _id: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

//TABLE
exports.newTable = (req, res) => {
    const mariageId = res.locals.mariageID;
    let table = new Table ({
        ...req.body,
        mariageID: mariageId
    });
    table.save()
        .then(newTable => {
            if(table) {
                Mariage.updateOne({_id: mariageId},
                    {$push: {tableID: newTable}})
                    .then(newTable => res.status(200).json(newTable))
                    .catch(err => res.status(400).json(err))
            } else
                res.status(400).json(err)
        })
        .catch(err => res.status(400).json({err}))
}

exports.table = (req, res, next) => {
    console.log('tables!')
    Table.findOne({ _id: req.params.id })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json( err ))
}

exports.tables = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    console.log("tables!")
    Table.find({mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateTable = (req, res) => {
    const mariageId = res.locals.mariageID;
    Table.updateOne({ _id: req.params.id },
        {$set: {...req.body, _id: req.params.id, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.deleteTable = (req, res) => {
    console.log("delete table!")
    const mariageId = res.locals.mariageID;
    Table.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
            console.log(data.deletedCount)
            if(data.deletedCount == 1){
                Mariage.updateOne({_id: mariageId}, {$pull: {tableID: req.params.id}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            } else
                return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json(err))
}



// //GROUPES
exports.newGroup = function (req, res) {
    const mariageId = res.locals.mariageID;
    let generatedpsw = generator.generate({
        length: 10,
        numbers: true
    });
    let group = new Group ({
        ...req.body,
        password: generatedpsw,
        mariageID: mariageId
    });
    group.save()
        .then(newGroup => {
            if(!group){
                res.status(400).json(err)
            } else {
                Mariage.updateOne({_id: mariageId},
                    {$push: {groupID: newGroup}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            }
        })
}

exports.group = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Group.findOne({ _id: req.params.id, mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.groups = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Group.find({mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateGroup = (req, res) => {
    const mariageId = res.locals.mariageID;
    Group.updateOne({ _id: req.params.id},
        {$set: {...req.body, _id: req.params.id, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.deleteGroup = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Group.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
            console.log(data.deletedCount)
            if(data.deletedCount == 1){
                Mariage.updateOne({_id: mariageId}, {$pull: {groupID: req.params.id}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            } else
                return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json(err))
}

// //CRUD guest
exports.newGuest = (req, res) => {
    const mariageId = res.locals.mariageID;
    let guestmenu = new GuestMenu ({
        mariageID: mariageId
    });
    guestmenu.save()
        .then(newGuestMenu => {
            if(!newGuestMenu){
                res.status(400).json(err)
            } else {
                console.log(newGuestMenu)
                let guest = new Guest ({
                    ...req.body,
                    guestMenuID: newGuestMenu._id,
                    groupID: req.params.id,
                    mariageID: mariageId
                });
                guest.save()
                    .then(newGuest => {
                        if(!guest) {
                            res.status(400).json(err)
                        } else {
                            Group.updateOne({_id: req.params.id},
                                {$push: {guestID: newGuest}})
                                .then(data => res.status(200).json(data))
                                .catch(err => res.status(400).json(err))
                        }
                    })
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(400).json(err))
}

exports.guest = (req, res, next) => {
    Guest.findOne({ _id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.guests = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.find({mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

// exports.updateGuest = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint. - updateGuest.")
//         else {
//             Guest.updateOne({_id: req.params.id},
//                 {...req.body, _id: req.params.id})
//             .then(() => res.status(200).json({ message: "Modification effectuée."}))
//             .catch(err => res.status(400).json ({ err }))
//             }
//         }
//     );
// }

// exports.deleteGuest = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Guest.deleteOne({_id: req.params.id}, function(err, result){
//                 console.log(result)
//                 if (err)
//                     res.send('err suppression guest')
//                 else 
//                 Group.updateMany({ }, { $pull: { guestID: req.params.id }},
//                     function(err, result){
//                         if (err)
//                             res.status(404).json('err update group')
//                     });
//             });
//             }
//         }
//     );
// }

// //ENTREE
// exports.newStarter = (req, res) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             let starter = new Starter ({
//                 ...req.body,
//                 menuID: req.params.id
//             });
//             starter.save()
//                 .then(newStarter => {
//                     if(!starter){
//                         res.status(400).json("Erreur création menu")
//                     } else {
//                         Menu.updateOne({_id: req.params.id},
//                             {$push: {starterID: newStarter}})
//                             .then(data => res.status(200).json({ data}))
//                             .catch(err => res.status(400).json({err}))
//                     }
//                 })
//                 .catch(err => res.status(400).json({err}))
//         }
//     })
// }

// exports.starter = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Starter.findOne({ _id: req.params.id })
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.starters = (req, res, next) => {
//     Starter.find({})
//         .then(data => res.status(200).json(data))
//         .catch(err => res.status(400).json( err ))
// }

// exports.updateStarter = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Starter.updateOne({_id: req.params.id},
//                 {...req.body, _id: req.params.id})
//             .then(() => res.status(200).json({ message: "Modification effectuée."}))
//             .catch(err => res.status(400).json ({ err }))
//             // next();
//         }
//     })
// }

// exports.deleteStarter = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Starter.deleteOne({_id: req.params.id})
//             .then(() => res.status(200).json({ message: "L'entrée a été supprimée avec succès."}))
//             .catch(err => res.status(400).json ({ err }))
//             // next();
//         }
//     })
// }

// //PLAT
// exports.newMaincourse = (req, res) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             let maincourse = new Starter ({
//                 ...req.body,
//                 menuID: req.params.id
//             });
//             maincourse.save()
//                 .then(newMaincourse => {
//                     if(!maincourse){
//                         res.status(400).json("Erreur création plat")
//                     } else {
//                         Menu.updateOne({_id: req.params.id},
//                             {$push: {maincourseID: newMaincourse}})
//                             .then(data => res.status(200).json({ data}))
//                             .catch(err => res.status(400).json({err}))
//                     }
//                 })
//                 .catch(err => res.status(400).json({err}))
//         }
//     })
// }

// exports.maincourse = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Maincourse.findOne({ _id: req.params.id })
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.maincourses = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//         Maincourse.find({})
//             .then(data => res.status(200).json(data))
//             .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.updateMaincourse = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Maincourse.updateOne({_id: req.params.id},
//                 {...req.body, _id: req.params.id})
//             .then(() => res.status(200).json({ message: "Modification effectuée."}))
//             .catch(err => res.status(400).json ({ err }))
//             // next();
//         }
//     })
// }

// exports.deleteMaincourse = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//         Maincourse.deleteOne({_id: req.params.id})
//         .then(() => res.status(200).json({ message: "Le plat a été supprimé avec succès."}))
//         .catch(err => res.status(400).json ({ err }))
//         // next();
//         }
//     })
// }

// //DESSERT
// exports.newDessert = (req, res) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             let dessert = new Dessert ({
//                 ...req.body,
//                 menuID: req.params.id
//             });
//             dessert.save()
//                 .then(newDessert => {
//                     if(!dessert){
//                         res.status(400).json("Erreur création dessert")
//                     } else {
//                         Menu.updateOne({_id: req.params.id},
//                             {$push: {dessertID: newDessert}})
//                             .then(data => res.status(200).json({ data}))
//                             .catch(err => res.status(400).json({err}))
//                     }
//                 })
//                 .catch(err => res.status(400).json({err}))
//         }
//     })
// }

// exports.dessert = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Dessert.findOne({ _id: req.params.id })
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.updateDessert = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Dessert.updateOne({_id: req.params.id},
//                 {...req.body, _id: req.params.id})
//             .then(() => res.status(200).json({ message: "Modification effectuée."}))
//             .catch(err => res.status(400).json ({ err }))
//             // next();
//         }
//     })
// }

// exports.deleteDessert = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Dessert.deleteOne({_id: req.params.id})
//             .then(() => res.status(200).json({ message: "Le dessert a été supprimé avec succès."}))
//             .catch(err => res.status(400).json ({ err }))
//             // next();
//         }
//     })
// }