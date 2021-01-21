import Choice from '../models/choix';
import Mariage from '../models/mariage';
import Group from '../models/groupe';
import Guest from '../models/invite';
jwt_secret = process.env.JWT_SECRET_KEY;
import jwt from 'jsonwebtoken';

exports.updateChoice = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the rights to do this action - update choice.")
        else {
            Choice.updateOne({_id: req.params.id},
                {$set: {tableID: req.body.table, menuID: req.body.menu, cakeID: req.body.cake}},
                function(err, result){
                    console.log(result)
                    if (err)
                        res.status(400).json("err update choice")
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

exports.getChoiceById = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json("You don't have the RIGHTS to do this action - choiceID.")
        else {
            Choice.findOne({
                _id: req.params.id
            }, function(err, choice){
                if (err)
                    res.status(400).json('err affichage choix')
                else
                res.send(choice)
            });
            }
        }
    );
}