const Todo = require('../models/todolist');
const Wedding = require('../models/mariage');

const findTodoById = async (id) => {
    const todo = await Todo.findById({ _id: id })
    return todo;
} 

exports.newTodo = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;

        if (!req.body.text) {
            return res.status(400).json({ success: false, message: "La valeur du champ ne peut pas être vide" });
        }

        let todo = new Todo({
            ...req.body,
            isCompleted: false,
            mariageID: mariageId
        });

        const newTodo = await todo.save();

        await Wedding.updateOne({ _id: mariageId },
            { $push: { todoListID: newTodo } });

        res.status(200).json({ success: true, data: newTodo });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la création de la tâche" });
    }
}


exports.todos = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const todos = await Todo.find({ mariageID })
        
        if(!todos){
            res.status(404).json({ success: false, message: "Liste de tâche introuvable !" })
            return;
        }

        res.status(200).json({ success: true, data: todos });
    } catch (err) {
        res.status(500).json({ success: false, message: "Echec serveur" })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingTodo = await findTodoById(req.params.id);
        if (!existingTodo) {
            return res.status(404).json({ success: false, message: "Le tâche que vous cherchez n'existe pas" });
        }

        const result = await Todo.updateOne(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id, mariageID: mariageId }
        );

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la mise à jour du todo." });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const mariageId = res.locals.mariageID;

        const existingTodo = await findTodoById(req.params.id);
        if (!existingTodo) {
            return res.status(404).json({ err: "Oups, la tâche que vous souhaitez supprimer n'existe pas" });
        }

        const weddingUpdateResult = await Wedding.updateOne({ _id: mariageId }, { $pull: { todoListID: req.params.id } });

        if (weddingUpdateResult.nModified !== 1) {
            return res.status(400).json({ success: false, message: "Oups, la mariage n'a pas été mis à jour" });
        }

        const todoDeleteResult = await Todo.deleteOne({ _id: req.params.id, mariageID: mariageId });

        if (todoDeleteResult.deletedCount === 0) {
            return res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression du la tâche" });
        }

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression du la tâche" });
    }
}
