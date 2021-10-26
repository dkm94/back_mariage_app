const Admin = require('../models/admin');
const Mariage = require('../models/mariage');
// const Group = require('../models/groupe');
const Guest = require("../models/invite");
const Invitation = require("../models/invitation");
const Budget = require("../models/budget");
const Menu = require('../models/menu');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET_KEY;
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.register = (req, res) => {
    let mariage = new Mariage ({
        ...req.body
    });
    mariage.save()
    .then(newMariage => {
        const {firstPerson, secondPerson, email, password} = req.body;
        if(!firstPerson || !secondPerson || !email || !password){
            return res.status(422).json({error: "Merci de renseigner tous les champs."})
        }
        let hash = bcrypt.hashSync(req.body.password, 10);
        let admin = new Admin ({
            ...req.body,
            password: hash,
            role: "admin",
            mariageID: newMariage._id
        })
        admin.save()
        .then(newAdmin => {
            let menu = new Menu ({
                ...req.body,
                mariageID: newMariage._id
            })
            menu.save()
            .then(newMenu => {
                let invitation = new Invitation ({
                    ...req.body,
                    title: "",
                    picture: "",
                    date: "",
                    places: [],
                    infos: "",
                    mariageID: newMariage._id
                })
                invitation.save()
                .then(newInvitation => {
                    let budget = new Budget({
                        ...req.body,
                        currency: "€",
                        operations: [],
                        mariageID: newMariage._id
                    })
                    budget.save()
                    .then(newBudget => {
                        Mariage.updateOne({_id: newMariage._id},
                        {$set: {
                            adminID: newAdmin._id, 
                            menuID: newMenu._id, 
                            invitationID: newInvitation._id, 
                            budgetID: newBudget._id}})
                        .then(data => {
                            const msg = {
                                to: admin.email,
                                from: "myweddingapp.mwa@gmail.com",
                                subject: "Votre compte a été créé avec succès.",
                                text: "<span>Rendez-vous sur votre tableau de bord pour commencer à visualiser les détais du mariage.</span>",
                                html: "<h1>Bienvenue sur My Wedding</h1>"
                            }
                            sgMail
                            .send(msg)
                            .then(() => {
                                console.log('Email sent')
                            })
                            .catch((error) => {
                            console.error(error)
                            })
                            res.status(200).json({message: "Accès autorisé, bienvenue sur votre compte."})
                        })
                        .catch(err => res.status(400).json(err))
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))  
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

exports.resetPassword = function(req, res) {
    Admin.findOne({ 
        email: req.body.email
    })
    .then(data => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: "Adresse mail introuvable."}))
}