const Table = require('../models/table');
const Mariage = require('../models/mariage');
const Guest = require('../models/invite');

const findTableById = async (id) => {
    const table = await Table.findById({ _id: id })
    return table;
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
            Mariage.updateOne({_id: mariageId},
                {$push: {tableID: newTable}})
                .then(data => res.status(200).json(newTable))
        })
        .catch(err => res.status(400).json({err}))
}

exports.table = async (req, res, next) => {
    try {
        const table = await findTableById(req.params.id)

        if(!table) {
            res.send({ success: false, message: "Table introuvable !", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: table, statusCode: 200 });
        } catch (err) {
            res.send({ success: false, message: "Echec serveur", statusCode: 500 })
        }
        
}

exports.tables = async (req, res, next) => {
    const { locals } = res;
    const mariageId = locals.mariageID;

    try {
        const tables = await Table.find({ mariageID: mariageId }).populate('guestID').exec()
        
        if(!tables){
            res.send({ success: false, message: "Tables introuvables !", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: tables, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
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
