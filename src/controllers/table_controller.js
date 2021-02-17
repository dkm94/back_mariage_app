const Admin = require('../models/admin');
const Table = require('../models/table');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Guest = require('../models/invite');

//TABLE
exports.newTable = (req, res) => {
    const mariageId = res.locals.mariageID;
    let table = new Table ({
        ...req.body,
        mariageID: mariageId
    });
    table.save()
        .then(newTable => {
            console.log(newTable)
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
        .populate('guestID')
        .exec()
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

exports.addGuestToTable = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Table.updateOne({ _id: req.params.id },
        {$push: {guestID: req.body.guestID}})
        .then(data => {
            if(data) {
                Guest.updateOne({ _id: req.body.guestID },
                    {$set: {tableID: req.params.id, mariageID: mariageId}})
                    .then(data => {
                        res.status(200).json(data)
                    })
                    .catch(err => res.status(400).json({ err}))
            }
        })
        .catch(err => res.status(400).json(err))
}

exports.deleteTable = (req, res) => {
    console.log("delete table!")
    const mariageId = res.locals.mariageID;
    Mariage.updateOne({ _id: mariageId}, {$pull: {tableID: req.params.id}})
        .then(data => {
            console.log("1e condition", data.nModified)
            if(data.nModified === 1){
                Guest.updateMany({tableID: req.params.id}, {$set: {tableID: null}})
                    .then(data => {
                        console.log("2e condition:", data.nModified)
                        if(data.nModified === 1 || data.nModified === 0){
                            Table.deleteOne({_id: req.params.id})
                                .then(data => res.status(200).json(data))
                                .catch(err => res.status(400).json(err))
                        } else
                            return res.status(400).json('erreur delete table')
                    })
                    .catch(err => res.status(400).json(err))
            } else
                return res.status(400).json('erreur update guests')
        })
        .catch(err => res.status(400).json('erreur update mariage'))
}

exports.deleteGuestFromTable = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Table.updateOne({ _id: req.params.id },
        {$pull: {guestID: req.body.guestID}})
        .then(res => {
            if(res.data != null) {
                Guest.updateOne({ _id: req.body.guestID },
                    {$set: {tableID: null, mariageID: mariageId}})
                    .then(data => {
                        res.status(200).json(data)
                    })
                    .catch(err => res.status(400).json({ err}))
            }
        })
        .catch(err => res.status(400).json(err))
}