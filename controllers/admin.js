const Admin = require('../models/admin');
const Table = require('../models/table');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Menu = require('../models/menu');
const Cake = require('../models/gateau');
const jwt_secret = process.env.JWT_SECRET_KEY,
jwt = require('jsonwebtoken'),
generator = require('generate-password');

// CRUD table
exports.newTable = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            let table = new Table ({
                name: req.body.name,
            });
                table.save({mariageID: decoded.id}, function(err, newTable) {
                    if (err)
                        res.status(400).json(err);
                    else {
                        Mariage.updateOne({mariageID: decoded.id},
                            {$set: {tableID: newTable }}, function(err, data){
                                if (err)
                                    res.status(400).json('err update mariage')
                                else
                                    res.status(200).json('La table ' + req.body.name + ' a été ajoutée' )
                            })
                    }
                        
                })
            }
        }
    );
}

exports.tables = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Table.find({
                mariageID: decoded.id
            }, function(err, tables){
                if (err)
                    res.send(err)
                else
                res.send(tables)
            });
            }
        }
    );
}


exports.updateTable = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Table.updateOne({_id: req.params.id, mariageID: decoded.id},
                {$set: {name: req.body.name}},
                function(err, data){
                    console.log(err)
                    if (err)
                        res.send(err)
                        else {
                            Mariage.updateOne({mariageID: decoded.id},
                                {$set: {tableID: data.id }}, function(err, data){
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json("La table " + req.body.name + " a été modifiée avec succès.")
                                })
                        }
                }
            );
        }
    }
);
}


//CRUD group
exports.newGroup = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            let generatedpsw = generator.generate({
                length: 10,
                numbers: true
            });
            let group = new Group ({
                name: req.body.name,
                mail: req.body.mail,
                password: generatedpsw
            });
                group.save({mariageID: decoded.id}, function(err, newGroup) {
                    console.log(newGroup);
                    if (err)
                        res.status(400).json('erreur création groupe');
                    else {
                        Mariage.updateOne({mariageID: decoded.id},
                            {$push: {groupID: newGroup }}, function(err, data){
                                if (err)
                                    res.status(400).json('err update mariage')
                                else
                                    res.status(200).json('Groupe ajouté avec succès. Mariage updated successfully.')
                            })
                    }
                        
                })
            }
        }
    );
}

exports.groups = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Group.find({
                mariageID: decoded.id
            }, function(err, groups){
                if (err)
                    res.send(err)
                else
                res.send(groups)
            });
            }
        }
    );
}

exports.updateGroup = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Group.updateOne({_id: req.params.id, mariageID: decoded.id},
                {$set: {name: req.body.name}},
                function(err, data){
                    console.log(err)
                    if (err)
                        res.send(err)
                        else {
                            Mariage.updateOne({_id: req.params.id, mariageID: decoded.id},
                                {$set: {groupID: data.id}}, function(err, data){
                                    console.log(data)
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json('Le groupe ' + req.body.name + ' a été modifié.')
                                })
                        }
                }
                );
            }
        }
    );
}

// CRUD menu
exports.newMenu = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            let menu = new Menu ({
                name: req.body.name,
                description: req.body.description
            });
                menu.save({mariageID: decoded.id}, function(err, newMenu) {
                    if (err)
                        res.status(400).json(('erreur création menu'));
                    else {
                        Mariage.updateOne({mariageID: decoded.id},
                            {$push: {menuID: newMenu }}, function(err, data){
                                if (err)
                                    res.status(400).json('err update mariage')
                                else
                                    res.status(200).json('Le menu ' + req.body.name + ' a été ajouté.' )
                            })
                    }
                        
                })
            }
        }
    );
}


exports.menus = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Menu.find({
                mariageID: decoded.id
            }, function(err, menus){
                if (err)
                    res.send(err)
                else
                res.send(menus)
            });
            }
        }
    );
}

//CRUD gâteau
exports.newCake = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            let cake = new Cake ({
                name: req.body.name,
                description: req.body.description
            });
                cake.save({mariageID: decoded.id}, function(err, newCake) {
                    if (err)
                        res.status(400).json(('erreur création gâteau'));
                    else {
                        Mariage.updateOne({mariageID: decoded.id},
                            {$push: {cakeID: newCake }}, function(err, data){
                                if (err)
                                    res.status(400).json('err update mariage')
                                else
                                    res.status(200).json(newCake.name + " a été ajouté.")
                            })
                    }
                        
                })
            }
        }
    );
}

exports.cakes = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Cake.find({
                mariageID: decoded.id
            }, function(err, cakes){
                if (err)
                    res.send(err)
                else
                res.send(cakes)
            });
            }
        }
    );
}