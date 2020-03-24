const Admin = require('../models/admin'),
Mariage = require('../models/mariage'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = function(req, res) {

    Mariage.create(req.body,function(err, newMariage) {
        if(err)
            res.status(400).json(err)
        else {
            let hash = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hash;
        
            Admin.create(function(err, newAdmin){
                if(err)
                    res.status(400).json(err)
                else
                    res.status(200).json("newAdmin")
            });
        }
            
    });


}



// login admin

exports.adminLogin = function(req, res) {

    Admin.findOne({ 
        mail: req.body.mail
    },function(err, admin){
        if(err)
            res.status(400).json({auth: false, message: err});
        else {
            bcrypt.compare(req.body.password, admin.password, function(err, admin) {
                if (admin)
                {
                    var token = jwt.sign({ id: admin._id, mariageID: admin.mariageID }, jwt_secret);
                    res.status(200).json({auth: true, token: token, message: "You can now access your account."});
                }
                else
                    res.status(201).json({auth: false, message: "Access restrcited."});
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
            bcrypt.compare(req.body.password, group.password, function(err, group) {
                if (group)
                {
                    var token = jwt.sign({ mariageID: mariage._id }, jwt_secret);
                    res.status(200).json({auth: true, token: token, message: "You can now access your account."});
                }
                else
                    res.status(201).json({auth: false, message: "Access restrcited."});
            })
        }
    });

}