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
    const mariageID = locals.mariageID;

    try {
        const tables = await Table.find({ mariageID })
        
        // Récupérer les invités pour chaque table
        const tablesWithGuests = await Promise.all(tables.map(async (table) => {
            const guests = await Guest.find({ tableID: table._id });
            // Ajouter les invités à chaque table
            return { ...table.toObject(), guestID: guests.map(guest => guest._id) };
        }));

        if (!tablesWithGuests) {
            res.send({ success: false, message: "Tables introuvables !", statusCode: 404 });
            return;
        }

        res.send({ success: true, data: tables, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
}

exports.updateTable = async (req, res) => {
    const mariageID = res.locals.mariageID;
    const _id = req.params.id;

    try {
        const table = findTableById(_id);

        if(!table) {
            res.send({ success: false, message: "Table introuvable !", statusCode: 404 })
            return;
        }

        const result = await Table.updateOne({ _id }, { $set: {...req.body, _id, mariageID }})

        if (result.nModified > 0) {
            res.status(200).json({ success: true, message: "La table a bien été modifiée", statusCode: 200 });
        } else {
            res.status(400).json({ success: false, message: "Echec de la modification de la table", statusCode: 400 });
        }
    }
    catch (err) {
        // exemple console.log(err) CastError: Cast to ObjectId failed for value "656656221099c0044c6bee7d5" (type string) at path "_id" for model "Table"
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
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
