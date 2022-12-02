const Admin = require('../models/admin');
const Mariage = require('../models/mariage');
const Guest = require("../models/invite");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET_KEY;
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
        .then(data => {
            // const msg = {
            //     to: admin.email,
            //     from: "myweddingapp.mwa@gmail.com",
            //     subject: "Votre compte a été créé avec succès.",
            //     text: "<span>Rendez-vous sur votre tableau de bord pour commencer à visualiser les détais du mariage.</span>",
            //     html: "<h1>Bienvenue sur My Wedding</h1>"
            // }
            // sgMail
            // .send(msg)
            // .then(() => {
            //     console.log('Email sent')
            // })
            // .catch((error) => {
            // console.error(error)
            // })
            res.status(200).json({message: "Accès autorisé, bienvenue sur votre compte."})
        })
        .catch(err => res.status(400).json(err))
    })
    .catch(err => console.log(err))  
}


exports.adminLogin = function(req, res) {
    let token;
    Admin.findOne({ email: req.body.email })
        .then(admin => {
            bcrypt.compare(req.body.password, admin.password, function(err, result) {
                if (result)
                {
                    Mariage.findOne({ _id: admin.mariageID })
                    .then(mariage => {
                        token = jwt.sign({ 
                            id: admin._id, 
                            mariageID: admin.mariageID, 
                            role: admin.role,
                            firstPerson: mariage.firstPerson,
                            secondPerson: mariage.secondPerson
                        }, jwt_secret);
                        res.status(200).json({auth: true, token: token, message: "Vous pouvez à présent accéder à votre compte."});
                    })
                    .catch(err => console.log(err))
                }
                else {
                    res.status(400).json({auth: false, message: "Echec connexion. Merci de vérifier vos identifiants."});
                }
            })
        })
        .catch(err => {
            console.log(error)
        })
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