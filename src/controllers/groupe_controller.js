const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const generator = require('generate-password');

exports.newGroup = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    let generatedpsw = generator.generate({
        length: 10,
        numbers: true
    });
    let group = new Group ({
        ...req.body,
        password: generatedpsw,
        mariageID: mariageId
    });
    group.save()
        .then(newGroup => {
            if(!group){
                res.status(400).json(err)
            } else {
                Mariage.updateOne({_id: mariageId},
                    {$push: {groupID: newGroup}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            }
        })
}

exports.group = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Group.findOne({ _id: req.params.id, mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.groups = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Group.find({mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateGroup = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Group.updateOne({ _id: req.params.id},
        {$set: {...req.body, _id: req.params.id, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.deleteGroup = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Group.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
            console.log(data.deletedCount)
            if(data.deletedCount == 1){
                Mariage.updateOne({_id: mariageId}, {$pull: {groupID: req.params.id}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            } else
                return res.status(400).json('erreur token ou serveur')
        })
        .catch(err => res.status(400).json(err))
}