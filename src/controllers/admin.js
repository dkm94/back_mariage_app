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





// //CRUD guest
exports.newGuest = (req, res, next) => {
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

exports.updateGuest = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.updateOne({ _id: req.params.id},
        {$set: {...req.body, _id: req.params.id, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.deleteGuest = (req, res) => {
    const mariageId = res.locals.mariageID;
    Guest.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
            console.log(data.deletedCount)
            if(data.deletedCount == 1){
                Group.updateMany({mariageID: mariageId}, {$pull: {guestID: req.params.id}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            } else
                return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json(err))
}

// MENU
exports.weddingMenu = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Menu.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

// //ENTREE
exports.newStarter = (req, res) => {
    const mariageId = res.locals.mariageID;
    let starter = new Starter ({
        ...req.body,
        menuID: req.params.id,
        mariageID: mariageId
    });
    starter.save()
        .then(newStarter => {
            if(!starter){
                res.status(400).json("Erreur création menu")
            } else {
                Menu.updateOne({_id: req.params.id, mariageID: mariageId},
                    {$push: {starterID: newStarter._id}})
                    .then(data => res.status(200).json({ data}))
                    .catch(err => res.status(400).json({err}))
            }
        })
        .catch(err => res.status(400).json({err}))
}

exports.starters = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Starter.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateStarter = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Starter.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteStarter = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Starter.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
        console.log(data.deletedCount)
        if(data.deletedCount == 1){
            Menu.updateMany({mariageID: mariageId}, {$pull: {starterID: req.params.id}})
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json(err))
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}

// //PLAT
exports.newMaincourse = (req, res) => {
    const mariageId = res.locals.mariageID;
    let maincourse = new Maincourse ({
        ...req.body,
        menuID: req.params.id,
        mariageID: mariageId
    });
    maincourse.save()
        .then(newMaincourse => {
            if(!maincourse){
                res.status(400).json("Erreur création menu")
            } else {
                Menu.updateOne({_id: req.params.id, mariageID: mariageId},
                    {$push: {maincourseID: newMaincourse._id}})
                    .then(data => res.status(200).json({ data}))
                    .catch(err => res.status(400).json({err}))
            }
        })
        .catch(err => res.status(400).json({err}))
}

exports.maincourses = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Maincourse.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateMaincourse = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Maincourse.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteMaincourse = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Maincourse.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
        console.log(data.deletedCount)
        if(data.deletedCount == 1){
            Menu.updateMany({mariageID: mariageId}, {$pull: {maincourseID: req.params.id}})
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json(err))
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}

// //DESSERT
exports.newDessert = (req, res) => {
    const mariageId = res.locals.mariageID;
    let dessert = new Dessert ({
        ...req.body,
        menuID: req.params.id,
        mariageID: mariageId
    });
    dessert.save()
        .then(newDessert => {
            if(!dessert){
                res.status(400).json("Erreur création menu")
            } else {
                Menu.updateOne({_id: req.params.id, mariageID: mariageId},
                    {$push: {dessertID: newDessert._id}})
                    .then(data => res.status(200).json({ data}))
                    .catch(err => res.status(400).json({err}))
            }
        })
        .catch(err => res.status(400).json({err}))
}

exports.desserts = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Dessert.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateDessert = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Dessert.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteDessert = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Dessert.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
        console.log(data.deletedCount)
        if(data.deletedCount == 1){
            Menu.updateMany({mariageID: mariageId}, {$pull: {dessertID: req.params.id}})
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json(err))
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}