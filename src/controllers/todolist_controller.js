const Todo = require('../models/todolist');
const Wedding = require('../models/mariage');

exports.newTodo = (req, res) => {
    const mariageId = res.locals.mariageID;
    let todo = new Todo ({
        ...req.body,
        color: "EAE3C9",
        isCompleted: false,
        mariageID: mariageId
    });
    todo.save()
        .then(newTodo => {
            if(!todo){
                res.status(400).json("Erreur création todo")
            } else {
                Wedding.updateOne({_id: mariageId},
                    {$push: {todoListID: newTodo._id}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(400).json({err}))
}

exports.todos = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Todo.find({ mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
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
    Wedding.updateOne({mariageID: mariageId}, {$pull: {todoListID: req.params.id}})
        .then(data => {
        if(data != null){
            Todo.deleteOne({_id: req.params.id, mariageID: mariageId})
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json(err))
        } else
            return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json (err))
}
