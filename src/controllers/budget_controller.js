const Operation = require("../models/budget_operation");

exports.operations = (req, res) => {
    const mariageId = res.locals.mariageID;
    Operation.find({ mariageID: mariageId })
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
    const mariageId = res.locals.mariageID;
    let operation = new Operation ({
        ...req.body,
        price: req.body.price,
        mariageID: mariageId
    });
    operation.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json (err))
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
    Operation.deleteOne({ _id: req.params.id, mariageID: mariageId })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err))
}