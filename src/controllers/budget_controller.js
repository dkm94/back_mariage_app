const Budget = require("../models/budget");
const Wedding = require("../models/budget");
const Operation = require("../models/budget_operation");

exports.budget = (req, res) => {
    const budgetId = res.locals.budgetID;
    Budget.findOne({ _id: budgetId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err))
}

exports.operations = (req, res) => {
    const budgetId = res.locals.budgetID;
    Operation.find({ budgetID: budgetId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err))
}

exports.operation = (req, res) => {
    Operation.findOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data)
            console.log(data.price.toFixed(2)/100)
        })
        .catch(err => res.status(400).json(err))
}

exports.newOperation = (req, res) => {
    const budgetId = res.locals.budgetID;
    let operation = new Operation ({
        ...req.body,
        price: req.body.price * 100,
        budgetID: budgetId
    });
    operation.save()
        .then(newExpense => {
            if(!operation){
                res.status(400).json("Erreur création operation")
            } else {
                Budget.updateOne({_id: req.params.id},
                    {$push: {operationsID: newExpense}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(400).json({err}))
}

exports.updateOperation = (req, res) => {
    const mariageId = res.locals.mariageID;
    Operation.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json (err))
}

exports.deleteOperation = (req, res) => {
    const mariageId = res.locals.mariageID;
    const budgetId = res.locals.budgetID;
    Budget.updateOne({ _id: budgetId }, {$pull: {operationsID: req.params.id}})
        .then(data => {
            if(data.nModified === 1){
                Operation.deleteOne({ _id: req.params.id })
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            } else
                return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json ({ err }))
}