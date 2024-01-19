const Table = require('../models/table');
const Mariage = require('../models/mariage');
const Guest = require('../models/invite');

const findTableById = async (id) => {
    const table = await Table.findById({ _id: id })
    return table;
}   

const findWeddingById = async (id) => {
    const wedding = await Mariage.findById({ _id: id })
    return wedding;
} 

//TABLE
exports.newTable = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;
        const tableName = req.body.name;

        const existingTable = await Table.findOne({ name: tableName, mariageID: mariageId });
        if (existingTable) {
            return res.status(400).json({ success: false, message: "Une table avec le même nom existe déjà." });
        }

        let table = new Table({
            ...req.body,
            mariageID: mariageId
        });

        const newTable = await table.save();

        await Mariage.updateOne({ _id: mariageId },
            { $push: { tableID: newTable } });

        res.status(200).json({ success: true, data: newTable });
    } catch (err) {
        res.send({ success: false, message: err.message || "Une erreur s'est produite lors de la création de la table.", statusCode: 500 })
    }
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
        const table = await findTableById(_id);

        if(!table) {
            res.status(404).json({ success: false, message: "Table introuvable !" })
            return;
        }

        if(!req.body.name){
            res.status(400).json({ success: false, message: "La champ ne peut être vide" });
            return;
        }

        if(table.name === req.body.name) {
            res.status(204).json({ success: false, message: "La valeur indiquée reste inchangée" })
            return;
        } else {
            const result = await Table.updateOne({ _id }, { $set: { name: req.body.name }})
    
            if (result.nModified > 0) {
                res.status(200).json({ success: true, message: "La table a bien été modifiée", statusCode: 200 });
            } else {
                res.status(400).json({ success: false, message: "Echec de la modification de la table", statusCode: 400 });
            }
        }

    }
    catch (err) {
        // exemple console.log(err) CastError: Cast to ObjectId failed for value "656656221099c0044c6bee7d5" (type string) at path "_id" for model "Table"
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
}

exports.deleteTable = async (req, res) => {
    const _id = res.locals.mariageID;
    const tableID = req.params.id;

    try {
        const table = await findTableById(tableID);
        if(!table) {
            res.send({ success: false, message: "Table introuvable !", statusCode: 404 })
            return;
        }

        const wedding = await findWeddingById(_id);
        if(!wedding) {
            res.send({ success: false, message: "Mariage introuvable !", statusCode: 404 })
            return;
        }

        const weddingResult = await Mariage.updateOne({ _id: res.locals.mariageID }, { $pull: { tableID: req.params.id } }) 
        if (weddingResult.nModified === 0) {
            res.status(400).json({ success: false, message: "Echec de la modification du mariage", statusCode: 400 });
            return;
        }

        const guests = await Guest.find({ tableID })
        if(!guests || guests.length === 0) {
            const result = await Table.deleteOne({ _id: tableID })
            if (result.deletedCount === 0) {
                res.status(400).json({ success: false, message: "Echec de la suppression de la table", statusCode: 400 });
                return;
            }
            
            res.status(200).json({ success: true, message: "La table a bien été supprimée", statusCode: 200 });
            return;
        }
        const updateGuestsResult = await Guest.updateMany({ tableID }, { $set: { tableID: null } })
        if (updateGuestsResult.nModified === 0) {
            res.status(400).json({ success: false, message: "Echec de modification des paramètres invités", statusCode: 400 });
            return;
        }

        const deleteTableResult = await Table.deleteOne({ _id: tableID })
        if (deleteTableResult.deletedCount === 0) {
            res.status(400).json({ success: false, message: "Echec de la suppression de la table", statusCode: 400 });
            return;
        }
        res.status(200).json({ success: true, message: "La table a bien été supprimée", statusCode: 200 });
        } catch (e) {
            res.send({ success: false, message: "Echec serveur", statusCode: 500 })
        }
}
