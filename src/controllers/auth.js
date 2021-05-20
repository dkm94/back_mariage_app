const Admin = require('../models/admin');
const Mariage = require('../models/mariage');
// const Group = require('../models/groupe');
const Guest = require("../models/invite");
const Invitation = require("../models/invitation");
const Budget = require("../models/budget");
const Menu = require('../models/menu');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = (req, res) => {
    let mariage = new Mariage ({
        ...req.body
    });
    mariage.save()
        .then(newMariage => {
            if(!mariage){
                res.status(400).json(err)
            } else {
                let hash = bcrypt.hashSync(req.body.password, 10);
                let admin = new Admin ({
                    ...req.body,
                    password: hash,
                    role: "admin",
                    mariageID: newMariage._id
                })
                admin.save()
                    .then(newAdmin => {
                        if(!admin){
                            res.status(400).json(err)
                        } else {
                            let menu = new Menu ({
                                ...req.body,
                                mariageID: newMariage._id
                            })
                            menu.save()
                                .then(newMenu => {
                                    if(!newMenu){
                                        res.status(400).json(err)
                                    } else {
                                        let invitation = new Invitation ({
                                            ...req.body,
                                            title: "",
                                            firstPerson: "",
                                            secondPerson: "",
                                            picture: "",
                                            date: "",
                                            places: [],
                                            infos: "",
                                            mariageID: newMariage._id
                                        })
                                        invitation.save()
                                            .then(newInvitation => {
                                                if(!newInvitation){
                                                    res.status(400).json(err)
                                                } else {
                                                    let budget = new Budget({
                                                        ...req.body,
                                                        currency: "€",
                                                        operations: [],
                                                        mariageID: newMariage._id
                                                    })
                                                    budget.save()
                                                        .then(newBudget => {
                                                            if(!newBudget){
                                                                res.status(400).json(err)
                                                            } else {
                                                                Mariage.updateOne({_id: newMariage._id},
                                                                    {$set: {adminID: newAdmin._id, menuID: newMenu._id, invitationID: newInvitation._id, budgetID: newBudget._id}})
                                                                    .then(data => res.status(200).json(data))
                                                                    .catch(err => res.status(400).json(err))
                                                            }
                                                        })
                                                }
                                            })
                                            .catch(err => res.status(400).json( err ))
                                    }
                                })
                                .catch(err => res.status(400).json( err ))
                        }
                    })
                    .catch(err => res.status(400).json( err ))  
            }
        })
        .catch(err => res.status(400).json( err ))    
}


exports.adminLogin = function(req, res) {
    Admin.findOne({ 
        email: req.body.email
    },function(err, admin){
        if(err)
            res.status(400).json({auth: false, message: "Echec connexion. Merci de vérifier vos identifiants."});
        else {
            bcrypt.compare(req.body.password, admin.password, function(err, result) {
                if (result)
                {
                    Mariage.findOne({ _id: admin.mariageID }, function(err, mariage){
                        if(err)
                            res.status(400).json("Erreur id mariage")
                            else {
                                var token = jwt.sign({ id: admin._id, mariageID: admin.mariageID, role: admin.role, invitationID: mariage.invitationID, budgetID: mariage.budgetID }, jwt_secret);
                                res.status(200).json({auth: true, token: token, message: "Vous pouvez à présent accéder à votre compte."});
                            }
                    })
                }
                else
                    res.status(400).json({auth: false, message: "Vous devez avoir un compte administrateur pour accéder à cette ressource."});
            })
        }
    });

}

exports.guestLogin = function(req, res) {

    Guest.findOne({ 
        email: req.body.email
    },function(err, guest){
        if(err)
            res.status(400).json({auth: false, message: "Please check email/password."});
        else {
            bcrypt.compare(req.body.password, guest.password, function(err, result) {
                if (result)
                {
                    var token = jwt.sign({ id: guest._id, mariageID: mariage._id, role: guest.role }, jwt_secret);
                    res.status(200).json({auth: true, token: token, message: "You can now access your account."});
                }
                else
                    res.status(400).json({auth: false, message: "Veuillez vérifier vos identifiants."});
            })
        }
    });

}