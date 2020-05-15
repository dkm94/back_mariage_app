const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Guest = require('../models/invite');
const jwt_secret = process.env.JWT_SECRET_KEY,
jwt = require('jsonwebtoken')


// READ own page
exports.myGroup = function (req, res) {
       
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - myGroup.")
        else {
            Group.findOne({
                _id: decoded.id
            }, function(err, myGroup){
                console.log(decoded)
                if (err)
                    res.status(400).json('err affichage myGroup')
                else
                    res.send(myGroup)
            });
        }
    });
}

// CRUD Comments 
exports.addComment = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - add comment.")
        else {
            // console.log(decoded.id)
            let comment = new Comment ({
                content: req.body.content
            });
                comment.save(function(err, newComment) {
                    console.log(newComment)
                    if (err)
                        res.status(400).json('err ajout nouveau commentaire');
                    else {
                        Group.updateOne({_id: decoded.id},
                            {$push: {commentID: newComment._id }}, function(err, result){
                                console.log(result)
                                if (err)
                                    res.status(400).json('err update group')
                                else {
                                    Mariage.updateOne({_id: decoded.mariageID},
                                        function(err, result){
                                            console.log(result)
                                            if (err)
                                                res.status(400).json('err update mariage')
                                            else
                                                res.status(200).json('Commentaire ajouté avec été ajouté avec succès.')
                                        })
                                }
                    
                            })
                    }
                        
                })
            }
        }
    );
}

exports.updateComment = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action - updateCake.")
        else {
            Comment.updateOne({_id: req.params.id},
                {$set: {content: req.body.content}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.send(err)
                        else {
                            Group.updateOne({_id: decoded.id},
                                function(err, result){
                                    console.log(result)
                                    if (err)
                                        res.status(400).json('err update group')
                                    else {
                                        Mariage.updateOne({_id: decoded.mariageID},
                                            function(err, result){
                                                console.log(result)
                                                if (err)
                                                    res.status(400).json('err update mariage')
                                                else
                                                    res.status(200).json('Commentaire ajouté avec été ajouté avec succès.')
                                            })
                                    }
                        
                                })
                        }
                }
                );
            }
        }
    );
}

exports.deleteComment = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - delete comment.")
        else {
            Comment.deleteOne({
                _id: req.params.id
            }, function(err, result){
                console.log(result)
                if (err)
                    res.status(400).json('err suppression commentaire')
                else {
                    Group.updateOne({
                        _id: decoded.id
                    },{$pull: {commentID: req.params.id}}, function(err, result){
                        console.log(result)
                        if (err)
                            res.send('err update comment')
                        else {
                            Mariage.updateOne({_id: decoded.mariageID},
                                function(err, result){
                                    console.log(result)
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json('update mariage ok' )
                                })
                        }
                    });
                }
            });
            }
        }
    );
}

// UPDATE & DELETE Guest

exports.updateGuest = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action - update guest.")
        else {
           Guest.updateOne({_id: req.params.id},
                {$set: {name: req.body.name}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.status(400).json('err update guest')
                        else {
                            Group.updateOne({_id: decoded.id},
                                function(err, result){
                                    console.log(result)
                                    if (err)
                                        res.status(400).json('err update group')
                                    else {
                                        Mariage.updateOne({_id: decoded.mariageID},
                                            function(err, result){
                                                console.log(result)
                                                if (err)
                                                    res.status(400).json('err update mariage')
                                                else
                                                    res.status(200).json('Modifications effectuées')
                                            })
                                    }
                        
                                })
                        }
                }
                );
            }
        }
    );
}

exports.deleteGuest = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - delete guest.")
        else {
            Guest.deleteOne({
                _id: req.params.id
            }, function(err, result){
                console.log(result)
                if (err)
                    res.status(400).json('err suppression invité')
                else {
                    Group.updateOne({
                        _id: decoded.id
                    },{$pull: {commentID: req.params.id}}, function(err, result){
                        console.log(result)
                        if (err)
                            res.status(400).json('err update group')
                        else {
                            Mariage.updateOne({_id: decoded.mariageID},
                                function(err, result){
                                    console.log(result)
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json('Modifications enregistrées.' )
                                })
                        }
                    });
                }
            });
            }
        }
    );
}