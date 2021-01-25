const GuestMenu = require('../models/menu-invité');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Guest = require('../models/invite');
const jwt_secret = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

exports.updateGuestMenu = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - update GuestMenu.")
        else {
            GuestMenu.updateOne({_id: req.params.id},
                {$set: {tableID: req.body.table, starterID: req.body.menu, dessertID: req.body.cake}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.status(400).json("err update GuestMenu")
                    else {
                        Guest.updateOne({_id: decoded.guestID},
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
                                                            res.status(200).json('Modifications effectuées.')
                                                    })
                                            }
                                
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

exports.getGuestMenuById = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the RIGHTS to do this action - GuestMenuID.")
        else {
            GuestMenu.findOne({
                _id: req.params.id
            }, function(err, GuestMenu){
                if (err)
                    res.status(400).json('err affichage choix')
                else
                res.send(GuestMenu)
            });
            }
        }
    );
}