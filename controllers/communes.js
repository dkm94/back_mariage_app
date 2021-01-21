import Table from '../models/table';
import Group from '../models/groupe';
import Menu from '../models/menu';
import Cake from '../models/gateau';
import Guest from '../models/invite';
jwt_secret = process.env.JWT_SECRET_KEY;
import jwt from 'jsonwebtoken';


// Read GROUP
exports.getAllGroups = function (req, res) {
       
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - getAllgroups.")
        else {
            Group.find({
                mariageID: decoded.mariageID
            }).populate('guestID').exec(function(err, groups){
                if (err)
                    res.status(400).json('err affichage groupes')
                else
                    res.send(groups)
            });
        }
    });
}


exports.getGroupById = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the RIGHTS to do this action - groupID.")
        else {
            Group.findOne({
                _id: req.params.id
            }).populate('guestID').exec(function(err, group){
                if (err)
                    res.status(400).json('err affichage groupe')
                else
                res.send(group)
            });
            }
        }
    );
}


// Read GUEST
exports.getAllGuests = function (req, res) {
       
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - getAllgroups.")
        else {
            Guest.find({
                groupID: req.params.id
            }, function(err, guests){
                console.log(decoded)
                if (err)
                    res.status(400).json('err affichage groupe')
                else
                    res.send(guests)
            });
        }
    });
}


exports.getGuestByID = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - menuID.")
        else {
            Guest.findOne({
                _id: req.params.id
            }, function(err, guest){
                if (err)
                    res.status(400).json("err affichage guest0")
                else
                res.send(guest)
            });
            }
        }
    );
}


// Read TABLE
exports.getAllTables = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("Vous n'avez pas les droits d'accès à cette ressource.")
        else {
            Table.find({
                mariageID: decoded.mariageID
            }, function(err, tables){
                if (err)
                    res.status(400).json("Eléments introuvables")
                else
                res.send(tables)
            });
        }  
    });
}

exports.getTableById = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - tableID.")
        else {
            Table.findOne({
                _id: req.params.id
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


// Read MENU
exports.getAllMenus = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - menus.")
        else {
            Menu.find({
                mariageID: decoded.mariageID
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

exports.getMenuById = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - menuID.")
        else {
            Menu.findOne({
                _id: req.params.id
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

// Read CAKE

exports.getAllCakes = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - cakes.")
        else {
            Cake.find({
                mariageID: decoded.mariageID
            }, function(err, cakes){
                if (err)
                    res.status(400).json('err affichage gâteau')
                else
                    res.send(cakes)
            });
            }
        }
    );
}

exports.getCakeById = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - cakeID.")
        else {
            Cake.findOne({
                _id: req.params.id
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

// READ Comments 
exports.getAllComments = function (req, res) {
       
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - getAllComments.")
        else {
            Comment.find({
                mariageID: decoded.mariageID
            }, function(err, comments){
                console.log(decoded)
                if (err)
                    res.status(400).json('err affichage commentaires')
                else
                    res.send(comments)
            });
        }
    });
}