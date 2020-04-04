const Admin = require('../models/admin');
const Table = require('../models/table');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Menu = require('../models/menu');
const Cake = require('../models/gateau');
const jwt_secret = process.env.JWT_SECRET_KEY,
jwt = require('jsonwebtoken'),
generator = require('generate-password');


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
                                    res.status(200).json('Table ajoutée avec succès. Mariage updated successfully.')
                            })
                    }
                        
                })
            }
        }
    );
}

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
                    console.log(err);
                    if (err)
                        res.status(400).json('erreur création groupe');
                    else {
                        Mariage.updateOne({mariageID: decoded.id},
                            {$set: {groupID: newGroup }}, function(err, data){
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
                            {$set: {menuID: newMenu }}, function(err, data){
                                if (err)
                                    res.status(400).json('err update mariage')
                                else
                                    res.status(200).json('Menu ajouté avec succès. Mariage updated successfully.')
                            })
                    }
                        
                })
            }
        }
    );
}

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
                            {$set: {cakeID: newCake }}, function(err, data){
                                if (err)
                                    res.status(400).json('err update mariage')
                                else
                                    res.status(200).json('Gâteau ajouté avec succès. Mariage updated successfully.')
                            })
                    }
                        
                })
            }
        }
    );
}