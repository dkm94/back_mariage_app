const Admin = require('../models/admin');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
const Menu = require('../models/menu');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = function(req, res) {
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
                    mariageID: newMariage._id
                })
                admin.save()
                .then(newAdmin => {
                    if(!admin){
                        res.status(400).json(err)
                    } else {
                        console.log(newAdmin)
                        let menu = new Menu ({
                            ...req.body,
                            mariageID: newMariage._id
                        })
                        menu.save()
                        .then(newMenu => {
                            if(!newMenu){
                                res.status(400).json(err)
                            } else {
                                Mariage.updateOne({_id: newMariage._id},
                                    {$set: {adminID: newAdmin._id, menuID: newMenu._id }})
                                    .then(newMariage => res.status(200).json({newMariage}))
                                    .catch(err => res.status(400).json({err}))
                            }
                        })
                    }
                })   
            }
        })    
}



// login admin

exports.adminLogin = function(req, res) {

    Admin.findOne({ 
        email: req.body.email
    },function(err, admin){
        if(err)
            res.status(400).json({auth: false, message: "Echec connexion. Merci de vérifier vos identifiants."});
        else {
            bcrypt.compare(req.body.password, admin.password, function(err, result) {
                console.log(admin)
                if (result)
                {
                    var token = jwt.sign({ id: admin._id, mariageID: admin.mariageID }, jwt_secret);
                    res.status(200).json({auth: true, token: token, message: "Vous pouvez à présent accéder à votre compte."});
                }
                else
                    res.status(400).json({auth: false, message: "Vous devez avoir un compte administrateur pour accéder à cette ressource."});
            })
        }
    });

}

exports.guestLogin = function(req, res) {

    Group.findOne({ 
        mail: req.body.mail
    },function(err, group){
        if(err)
            res.status(400).json({auth: false, message: "Please check email/password."});
        else {
            bcrypt.compare(req.body.password, group.password, function(err, result) {
                console.log(group)
                if (result)
                {
                    var token = jwt.sign({ mariageID: mariage._id, id: group._id, guestID: guest._id }, jwt_secret);
                    res.status(200).json({auth: true, token: token, message: "You can now access your account."});
                }
                else
                    res.status(400).json({auth: false, message: "Access restrcited."});
            })
        }
    });

}