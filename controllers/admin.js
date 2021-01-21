const Admin = require('../models/admin');
const Table = require('../models/table');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Menu = require('../models/menu');
const Cake = require('../models/gateau');
const Guest = require('../models/invite');
const jwt_secret = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
const generator = require('generate-password');

//RUD admin
exports.myAccount = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - myAccount.")
        else {
            Admin.findOne({
                _id: decoded.id
            }, function(err, admin){
                if (err)
                    res.status(400).json("admin introuvable")
                else 
                    res.status(200).json(admin)
                }
            );
        }
    });
}

exports.updateAdmin = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("Vous n'avez pas les droits d'accès à cette ressource.")
        else {
            Admin.updateOne({_id: decoded.id},
                {$set: {firstPerson: req.body.firstPerson, secondPerson: req.body.secondPerson, password: req.body.password, media: req.body.media}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.status(400).json("Echec des modifications.")
                    else {
                        Mariage.updateOne({
                            _id: decoded.mariageID
                        }), function(err, result){
                            console.log(result)
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json('Modifications effectuées.')
                        }
                    }         
                }
            );
        }
    });
}

exports.deleteAdmin = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - deleteAdmin.")
        else {
            Admin.deleteOne({
                _id: decoded.id
            },  function(err, result){
                if (err)
                    res.send('err suppression admin')
                else {
                    Mariage.deleteOne({
                        _id: decoded.mariageID
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
            res.status(400).json("You don't have the rights to do this action - mariageID.")
        else {
            Mariage.findOne({
                _id: decoded.mariageID
            }, function(err, mariage){
                if (err)
                    res.status(200).json('err affichage mariage')
                else
                res.send(mariage)
            }).populate('groupID').exec(function(err, data){
                if (err)
                    res.status(400).json('err populate groupID')
                else
                res.send(data)
            });
            }
        }
    );
}

exports.updateMariage = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action - updateMariage.")
        else {
            Mariage.updateOne({_id: decoded.mariageID},
                {$set: {title: req.body.title, media: req.body.media}},
                function(err, data){
                    console.log(data)
                    if (err)
                        res.send(err)
                        else {
                            Admin.updateOne({_id: decoded.id},
                                {$set: {mariageID: decoded.mariageID}}, function(err, data){
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
            res.status(400).json("You don't have the rights to do this action - newTable.")
        else {
            let table = new Table ({
                name: req.body.name,
                mariageID: decoded.mariageID
            });
                table.save(function(err, newTable) {
                    if (err)
                        res.status(400).json(err);
                    else {
                        Mariage.updateOne({_id: decoded.mariageID},
                            {$push: {tableID: newTable._id }}, function(err, data){
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

//CONTINUER MODIFS

exports.updateTable = function (req, res) {

    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action - updateTable.")
        else {
            const params = req.params.id
            Table.updateOne({_id: params},
                {$set: {name: req.body.name}},
                function(err, data){
                    console.log(err)
                    if (err)
                        res.send(err)
                        else {
                            Mariage.updateOne({_id: decoded.mariageID},
                                {$set: {tableID: params}}, function(err, data){
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
            res.status(400).json("You don't have the rights to do this action - deleteTable.")
        else {
            const params = req.params.id
            Table.deleteOne({
                _id: params
            }, function(err, result){
                console.log(result)
                if (err)
                    res.send('err suppression table')
                else {
                    Mariage.updateOne({ _id: decoded.mariageID},
                        {$pull: {tableID: params}}, function(err, result){
                            console.log(result)
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json('La table a été supprimée.')
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
            res.status(400).json("You don't have the rights to do this action - newGroup.")
        else {
            let generatedpsw = generator.generate({
                length: 10,
                numbers: true
            });
            let group = new Group ({
                name: req.body.name,
                mail: req.body.mail,
                password: generatedpsw,
                commentID: null,
                mariageID: decoded.mariageID
            });
            group.save(function(err, newGroup) {
                console.log(newGroup)
                if (err)
                    res.status(404).json('erreur création groupe');
                else {
                    Mariage.updateOne({_id: decoded.mariageID},
                        {$push: {groupID: newGroup._id}},
                        function(err, data){
                            // console.log(decoded.mariageID)
                            console.log(data)
                            if (err)
                                res.status(404).json('err update mariage')
                            else
                                res.status(200).json(newGroup.name + " a été ajouté à la liste de mariage.")
                        }
                    )
                }
            })
        }
    })
}

exports.updateGroup = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action - updateGroup.")
        else {
            const params = req.params.id
            Group.updateOne({_id: params},
                // {$set: {name: req.body.name, mail: req.body.mail, guestID: req.body['guestID[]']}},
                {$set: {name: req.body.name, mail: req.body.mail}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.send(err)
                        else {
                            Mariage.updateOne({_id: decoded.mariageID},
                                {$set: {groupID: params}}, function(err, result){
                                    console.log(result)
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
            res.status(400).json("You don't have the rights to do this action - deleteGroup.")
        else {
            const params = req.params.id
            Guest.deleteMany({ groupID: params }),
            function(err, result){
                console.log(params)
                if (err)
                    res.status(400).json('err suppression guest')
                else {
                    Group.deleteOne({
                        _id: params
                    }, function(err, result){
                        console.log(result)
                        if (err)
                            res.send('err suppression group')
                        else {
                            Mariage.updateOne({_id: decoded.mariageID},{$pull: {groupID: params}},
                                function(err, result){
                                    console.log(params)
                                    if (err)
                                        res.status(400).json('err update mariage')
                                    else
                                        res.status(200).json('Le groupe a été supprimé.' )
                                }
                            )
                        }
                    });
                }
            }
        }
    });
}

//CRUD guest
exports.newGuest = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - newGuest.")
        else {
            const params = req.params.id
            let guest = new Guest ({
                name: req.body.name,
                groupID: params,
                media: null,
                choiceID: null
            });
                guest.save(function(err, newGuest) {
                    console.log(newGuest)
                    if (err)
                        res.status(400).json(err);
                    else {
                        Group.updateOne({_id: params},
                            {$push: {guestID: newGuest._id }}, function(err, result){
                                console.log(err)
                                if (err)
                                    res.status(400).json('err update group')
                                else
                                    res.status(200).json(newGuest.name + ' a été ajouté avec succès.')
                            }
                        )
                    }
                        
                })
            }
        }
    );
}

exports.updateGuest = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - updateGuest.")
        else {
            const params = req.params.id
            Guest.updateOne({_id: params},
                {$set: {name: req.body.name}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.status(400).json("err update guest")
                    else 
                        res.send(result)
                }
                );
            }
        }
    );
}

exports.deleteGuest = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - deleteGuest.")
        else {
            const params = req.params.id
            Guest.deleteOne({
                _id: params
            }, function(err, result){
                console.log(result)
                if (err)
                    res.send('err suppression guest')
                else 
                Group.updateMany({ }, { $pull: { guestID: params }},
                    function(err, result){
                        if (err)
                            res.status(404).json('err update group')
                    });
            });
            }
        }
    );
}

// const deleteGuest = 
//     async function (req, res) {
//         try {
//             const decoded = await jwt.verify(req.token, jwt_secret);
//             const params = req.params.id
//             await Guest.deleteOne({ _id: params });
//             // await Group.updateOne({ _id: req.body.id }, { $pull: { guestID: params }});
//             await Group.updateMany({ }, { $pull: { guestID: params }});
    
//             res.status(200).json('Guest deleted successfully')
//         }
//         catch {
//             res.status(400).json("error here")
//         }
//     }
//     exports.deleteGuest = deleteGuest;

// CRUD menu
exports.newMenu = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - newMenu.")
        else {
            let menu = new Menu ({
                name: req.body.name,
                description: req.body.description,
                mariageID: decoded.mariageID
            });
                menu.save(function(err, newMenu) {
                    if (err)
                        res.status(400).json(('erreur création menu'));
                    else {
                        Mariage.updateOne({_id: decoded.mariageID},
                            {$push: {menuID: newMenu.id}}, function(err, data){
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


exports.updateMenu = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action - updateMenu.")
        else {
            const params = req.params.id
            Menu.updateOne({_id: params},
                {$set: {name: req.body.name}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.send(err)
                        else {
                            Mariage.updateOne({_id: decoded.mariageID},
                                {$set: {menuID: params}}, function(err, result){
                                    console.log(result)
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
            res.status(400).json("You don't have the rights to do this action - deleteMenu.")
        else {
            const params = req.params.id
            Menu.deleteOne({
                _id: params
            }, function(err, result){
                console.log(result)
                if (err)
                    res.send('err suppression menu')
                else {
                    Mariage.updateOne({_id: decoded.mariageID},
                        {$pull: {menuID: params}}, function(err, result){
                            console.log(result)
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json('Le menu a été supprimé.')
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
            res.status(400).json("You don't have the rights to do this action - newCake.")
        else {
            let cake = new Cake ({
                name: req.body.name,
                description: req.body.description,
                mariageID: decoded.mariageID
            });
                cake.save(function(err, newCake) {
                    if (err)
                        res.status(400).json(('erreur création gâteau'));
                    else {
                        Mariage.updateOne({_id: decoded.mariageID},
                            {$push: {cakeID: newCake._id}}, function(err, data){
                                console.log(data)
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

exports.updateCake = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        console.log(err)
        if (err)
            res.status(400).json("You don't have the rights to do this action - updateCake.")
        else if (decoded.id){
            const params = req.params.id
            Cake.updateOne({_id: params},
                {$set: {name: req.body.name, description: req.body.description}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.status(400).json('Err update gâteau')
                        else 
                            res.status(200).json('Le dessert ' + req.body.name + ' a été modifié.')
                }
            );
        }
        }
    );
}

exports.deleteCake = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - deleteCake.")
        else if (decoded.id){
            const params = req.params.id
            Cake.deleteOne({
                _id: params
            }, function(err, result){
                console.log(result)
                if (err)
                    res.send('err suppression gâteau')
                else 
                    res.status(200).json('Le gâteau a été supprimé.')  
            });
            }
        }
    );
}