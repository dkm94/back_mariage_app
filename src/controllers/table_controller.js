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
    // const mariageId = res.locals.mariageID;
    console.log("tables!")
    Table.find({ })
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


// Guest.updateMany({ params }) set tableID to null
// exports.deleteTable = (req, res) => {
//     console.log("delete table!")
//     const mariageId = res.locals.mariageID;
//     Table.deleteOne({_id: req.params.id, mariageID: mariageId})
//         .then(data => {
//             console.log(data.deletedCount)
//             if(data.deletedCount == 1){
//                 Mariage.updateOne({_id: mariageId}, {$pull: {tableID: req.params.id}})
//                     .then(data => res.status(200).json(data))
//                     .catch(err => res.status(400).json(err))
//             } else
//                 return res.status(400).json('erreur deleted count')
//         })
//         .catch(err => res.status(400).json(err))
// }

exports.deleteTable = (req, res) => {
    console.log("delete table!")
    const mariageId = res.locals.mariageID;
    Table.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
            console.log(data.deletedCount)
            if(data.deletedCount == 1){
                Guest.updateMany({groupID: req.params.id, mariageID: mariageId}, {$set: {tableID: ""}})
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
            } else
                return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json(err))
}