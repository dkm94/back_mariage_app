const Admin = require('../models/admin');
const Table = require('../models/table');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Menu = require('../models/menu');
const Cake = require('../models/gateau');
const Guest = require('../models/invite');
const jwt_secret = process.env.JWT_SECRET_KEY,
jwt = require('jsonwebtoken'),
generator = require('generate-password');

//RUD admin
exports.adminID = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Admin.findOne({
                id: decoded.id, _id: req.params.id
            }, function(err, admin){
                if (err)
                    res.send(err)
                else
                res.send(admin)
            });
            }
        }
    );
}

exports.updateAdmin = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Admin.updateOne({_id: req.params.id, id: decoded.id},
                {$set: {firstPerson: req.body.firstPerson, secondPerson: req.body.secondPerson, password: req.body.password}},
                function(err, data){
                    console.log(data)
                    if (err)
                        res.status(400).json('err update admin')
                        else 
                            res.status(200).json('Modifications effectuées.')
                        
                }
            );
        }
    }
);
}

exports.deleteAdmin = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Admin.deleteOne({
                _id: req.params.id, id: decoded.id
            },  function(err, result){
                if (err)
                    res.send('err suppression admin')
                else {
                    Mariage.deleteOne({
                        mariageID: decoded.id
                    },  function(err, data){
                            console.log(data)
                            if (err)
                                res.status(400).json('err suppression mariage')
                            else
                                res.status(200).json('Compte supprimé avec succès.')
                        }
                    )
                }
                });
            }
        }
    );
}

//RU mariage 
exports.mariageID = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Mariage.findOne({
                mariageID: decoded.id, _id: req.params.id
            }, function(err, mariage){
                if (err)
                    res.send(err)
                else
                res.send(mariage)
            });
            }
        }
    );
}

exports.updateMariage = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Mariage.updateOne({_id: req.params.id, mariageID: decoded.id},
                {$set: {title: req.body.title, media: req.body.media}},
                function(err, data){
                    console.log(data)
                    if (err)
                        res.send(err)
                        else {
                            Admin.updateOne({id: decoded.id},
                                {$set: {mariageID: req.params.id}}, function(err, data){
                                    console.log(data)
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json('Les modifications ont été effectuées.')
                                }
                            )
                        }
                        
                }
            );
        }
    }
);
}

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
                            {$push: {tableID: newTable }}, function(err, data){
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

exports.tableID = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Table.findOne({
                mariageID: decoded.id, _id: req.params.id
            }, function(err, table){
                if (err)
                    res.send(err)
                else
                res.send(table)
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
                                {$set: {tableID: req.params.id}}, function(err, data){
                                    console.log(data)
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json('La table ' + req.body.name + ' a été modifiée.')
                                }
                            )
                        }
                }
            );
        }
    }
);
}

exports.deleteTable = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Table.deleteOne({
                _id: req.params.id, mariageID: decoded.id
            }, function(err, result){
                if (err)
                    res.send('err suppression table')
                else {
                    Mariage.updateOne({mariageID: decoded.id},
                        {$pull: {tableID: req.params.id}}, function(err, data){
                            console.log(data)
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json('La table ' + req.params.id + ' a été supprimée.')
                        }
                    )
                }
            });
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
                password: generatedpsw,
            });
                group.save({mariageID: decoded.id}, function(err, newGroup) {
                    console.log(err)
                    if (err)
                        res.status(400).json('erreur création groupe');
                    else {
                        Mariage.updateOne({mariageID: decoded.id},
                            {$push: {groupID: newGroup }}, function(err, data){
                                if (err)
                                    res.status(400).json('err update mariage')
                                else
                                    res.status(200).json('Le groupe ' + req.body.name + ' a été ajouté.' )
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
                // console.log(err)
                if (err)
                    res.status(400).json('err affichage groupes')
                else
                res.status(200).json(groups)
            });
            }
        }
    );
}

exports.groupID = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Group.findOne({
                mariageID: decoded.id, _id: req.params.id
            }, function(err, group){
                if (err)
                    res.send(err)
                else
                res.send(group)
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
                            Mariage.updateOne({mariageID: decoded.id},
                                {$set: {groupID: req.params.id}}, function(err, data){
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

exports.deleteGroup = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Group.deleteOne({
                _id: req.params.id, mariageID: decoded.id
            }, function(err, result){
                if (err)
                    res.send('err suppression groupe')
                else {
                    Mariage.updateOne({mariageID: decoded.id},
                        {$pull: {groupID: req.params.id}}, function(err, data){
                            console.log(data)
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json('Le groupe ' + req.params.id + ' a été supprimé.')
                        })
                }
                    // res.send('Le groupe '+ req.params.name + ' a été supprimé.')
            });
            }
        }
    );
}

//CRUD groupe
exports.newGuest = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            let guest = new Guest ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                media: req.body.media,
                groupID: req.params.groupID,
                choiceID: null
            });
                guest.save({mariageID: decoded.id}, function(err, newGuest) {
                    console.log(err)
                    if (err)
                        res.status(400).json(err);
                    else {
                        Group.updateOne({mariageID: decoded.id},
                            {$push: {guestID: newGuest }}, function(err, group){
                                console.log(err)
                                if (err)
                                    res.status(400).json('err update mariage')
                                else {
                                    Mariage.updateOne({mariageID: decoded.id},
                                        {$push: {groupID: group }}, function(err, mariage){
                                            console.log(err)
                                            if (err)
                                                res.status(400).json('err update mariage')
                                            else
                                                res.status(200).json(newGuest.firstName + '' + newGuest.lastName + ' a été ajouté avec succès à ' + group)
                                        })
                                }
                    
                            })
                    }
                        
                })
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

exports.menuID = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Menu.findOne({
                mariageID: decoded.id, _id: req.params.id
            }, function(err, menu){
                if (err)
                    res.send(err)
                else
                res.send(menu)
            });
            }
        }
    );
}

exports.updateMenu = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Menu.updateOne({_id: req.params.id, mariageID: decoded.id},
                {$set: {name: req.body.name}},
                function(err, data){
                    console.log(err)
                    if (err)
                        res.send(err)
                        else {
                            Mariage.updateOne({mariageID: decoded.id},
                                {$set: {menuID: req.params.id}}, function(err, data){
                                    console.log(data)
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json('Le menu ' + req.body.name + ' a été modifié.')
                                })
                        }
                }
                );
            }
        }
    );
}

exports.deleteMenu = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Menu.deleteOne({
                _id: req.params.id, mariageID: decoded.id
            }, function(err, result){
                if (err)
                    res.send('err suppression menu')
                else {
                    Mariage.updateOne({mariageID: decoded.id},
                        {$pull: {menuID: req.params.id}}, function(err, data){
                            console.log(data)
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json('Le menu ' + req.params.id + ' a été supprimé.')
                        }
                    )
                }
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

exports.cakeID = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Cake.findOne({
                mariageID: decoded.id, _id: req.params.id
            }, function(err, cake){
                if (err)
                    res.send(err)
                else
                res.send(cake)
            });
            }
        }
    );
}

exports.updateCake = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Cake.updateOne({_id: req.params.id, mariageID: decoded.id},
                {$set: {name: req.body.name}},
                function(err, data){
                    console.log(err)
                    if (err)
                        res.send(err)
                        else {
                            Mariage.updateOne({mariageID: decoded.id},
                                {$set: {cakeID: req.params.id}}, function(err, data){
                                    console.log(data)
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json('Le dessert ' + req.body.name + ' a été modifié.')
                                })
                        }
                }
                );
            }
        }
    );
}

exports.deleteCake = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action.")
        else {
            Cake.deleteOne({
                _id: req.params.id, mariageID: decoded.id
            }, function(err, result){
                if (err)
                    res.send('err suppression gâteau')
                else {
                    Mariage.updateOne({mariageID: decoded.id},
                        {$pull: {cakeID: req.params.id}}, function(err, data){
                            console.log(data)
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json('Le gâteau ' + req.params.id + ' a été supprimé.')
                        }
                    )
                }
            });
            }
        }
    );
}