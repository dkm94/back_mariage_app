const Admin = require('../models/admin');
// const Table = require('../models/table');
// const Mariage = require('../models/mariage');
// const Group = require('../models/groupe');
// const Guest = require('../models/invite');
// const Menu = require('../models/menu');
// const Starter = require('../models/menu-entrée');
// const Maincourse = require('../models/menu-plat');
// const Dessert = require('../models/menu-dessert');
const jwt_secret = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
// const generator = require('generate-password');
// const deleteUser = require("../middlewares/delete.user.cascade")

//RUD admin
exports.myAccount = function (req, res) {
    console.log("MyAccount")
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("Accès restreint.")
        else {
            Admin.findOne({
                _id: decoded.id
            }, function(err, admin){
                if (err)
                    res.status(400).json("admin introuvable")
                else 
                    res.status(200).json(admin)
                }
            );
        }
    });
}

// exports.updateAdmin = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Admin.updateOne({_id: decoded.id},
//                 {$set: {...req.body, mariageID: decoded.mariageID}})
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json({ err}))
//         }
//     });
// }

// // exports.deleteAccount =  function (req, res) {
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

// //
// exports.mariageID = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Mariage.findOne({
//                 _id: decoded.mariageID
//             }, function(err, mariage){
//                 if (err)
//                     res.status(200).json('err affichage mariage')
//                 else
//                 res.send(mariage)
//             }).populate('groupID').exec(function(err, data){
//                 if (err)
//                     res.status(400).json('err populate groupID')
//                 else
//                 res.send(data)
//             });
//             }
//         }
//     );
// }

// exports.updateMariage = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         console.log(err)
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Mariage.updateOne({ _id: decoded.mariageID },
//                 {$set: {...req.body, _id: decoded.mariageID}})
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json({ err}))
//         }
//     }
// );
// }

// //TABLE
// exports.newTable = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             let table = new Table ({
//                 ...req.body,
//                 mariageID: decoded.mariageID
//             });
//             table.save()
//             .then(newTable => {
//                 if(project) {
//                     Dashboard.updateOne({_id: req.params.id},
//                         {$push: {myprojectsID: newTable}})
//                         .then(data => res.status(200).json({ data}))
//                         .catch(err => res.status(400).json({err}))
//                 } else
//                     res.status(400).json(err)
//             })
//             .catch(err => res.status(400).json({err}))
//             }
//         }
//     );
// }

// exports.table = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Table.findOne({ _id: req.params.id })
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.tables = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Table.find({})
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.updateTable = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         console.log(err)
//         if (err)
//             res.status(400).json("La table a été modifiée.")
//         else {
//             Table.updateOne({ _id: req.params.id },
//                 {$set: {...req.body, _id: req.params.id}})
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json({ err}))
//         }
//     });
// }

// exports.deleteTable = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Table.deleteOne({_id: req.params.id})
//             .then(() => res.status(200).json({ message: "La table a été supprimée."}))
//             .catch(err => res.status(400).json ({ err }))
//         }
//     });
// }


// //GROUPES
// exports.newGroup = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             let generatedpsw = generator.generate({
//                 length: 10,
//                 numbers: true
//             });
//             let group = new Group ({
//                 ...req.body,
//                 password: generatedpsw,
//                 mariageID: decoded.mariageID
//             });
//             group.save(function(err, newGroup) {
//                 console.log(newGroup)
//                 if (err)
//                     res.status(404).json('erreur création groupe');
//                 else {
//                     Mariage.updateOne({_id: decoded.mariageID},
//                         {$push: {groupID: newGroup}}
//                         .then(data => res.status(200).json({ data}))
//                         .catch(err => res.status(400).json({err}))
//                     )
//                 }
//             })
//         }
//     })
// }

// exports.group = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Group.findOne({ _id: req.params.id })
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.groups = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Group.find({})
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.updateGroup = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Group.updateOne({ _id: req.params.id },
//                 {$set: {...req.body, _id: req.params.id}})
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json({ err}))
//             }
//         }
//     );
// }

// exports.deleteGroup = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Group.deleteOne({_id: req.params.id})
//             .then(() => res.status(200).json({ message: "Le groupe a été supprimé."}))
//             .catch(err => res.status(400).json ({ err }))
//             // next();
//         }
//     })
// }

// //CRUD guest
// exports.newGuest = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             let guest = new Guest ({
//                 ...req.body,
//                 groupID: req.params.id,
//             });
//                 guest.save()
//                     .then(newGuest => {
//                         if(!guest) {
//                             res.status(400).json(err)
//                         } else {
//                             Group.updateOne({_id: req.params.id},
//                                 {$push: {groupID: newGuest}})
//                                 .then(data => res.status(200).json({ data}))
//                                 .catch(err => res.status(400).json({err}))
//                         }
//                     })
//                     .catch(err => res.status(400).json({err}))
//             }
//         }
//     );
// }

// exports.guest = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Guest.findOne({ _id: req.params.id })
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

// exports.guests = (req, res, next) => {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("Accès restreint.")
//         else {
//             Guest.find({})
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json( err ))
//         }
//     })
// }

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