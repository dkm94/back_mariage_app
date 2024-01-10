const Todo = require('../models/todolist');
const Wedding = require('../models/mariage');

exports.newTodo = (req, res) => {
    const mariageId = res.locals.mariageID;
    let todo = new Todo ({
        ...req.body,
        color: "f2eede",
        isCompleted: false,
        mariageID: mariageId
    });
    todo.save()
        .then(newTodo => {
            Wedding.updateOne({_id: mariageId},
                {$push: {todoListID: newTodo}})
                .then(data => res.status(200).json(newTodo))
        })
        .catch(err => res.status(400).json({err}))
}

exports.todos = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const todos = await Todo.find({ mariageID })
        
        if(!todos){
            res.send({ success: false, message: "Liste de tâche introuvable !", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: todos, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
}

exports.updateTodo = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Todo.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json (err))
}

exports.deleteTodo = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Wedding.updateOne({_id: mariageId}, {$pull: {todoListID: req.params.id}})
        .then(data => {
        res.json(data)
        if(data != null){
            Todo.deleteOne({_id: req.params.id, mariageID: mariageId})
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json(err))
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json (err))
}
