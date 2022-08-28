const Table = require('../models/table');
const Mariage = require('../models/mariage');
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
            Mariage.updateOne({_id: mariageId},
                {$push: {tableID: newTable}})
                .then(data => res.status(200).json(newTable))
        })
        .catch(err => res.status(400).json({err}))
}

exports.table = (req, res, next) => {
    Table.findOne({ _id: req.params.id })
    .populate('guestID')
    .exec()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json( err ))
}

exports.tables = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Table.find({ mariageID: mariageId })
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

exports.deleteTable = (req, res) => {
    const mariageId = res.locals.mariageID;
    Mariage.updateOne({ _id: mariageId}, {$pull: {tableID: req.params.id}})
        .then(data => {
            if(data != null){
                Guest.updateMany({tableID: req.params.id}, {$set: {tableID: null}})
                    .then(data => {
                        if(data != null){
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
