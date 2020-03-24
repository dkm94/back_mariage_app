const User = require('../models/admin'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = function(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10);
    let admin = new Admin ({
        name: req.body.name,
        mail: req.body.mail,
        password: hash
    });

    admin.save(function(err, admin) {
        if(err)
            res.send(err)
        else
            res.send(admin)
    });

}

// register invité

exports.login = function(req, res) {

    Admin.findOne({ 
        mail: req.body.mail
    },function(err, admin){
        if(err)
            res.status(400).json({auth: false, message: err});
        else {
            bcrypt.compare(req.body.password, admin.password, function(err, admin) {
                if (admin)
                {
                    var token = jwt.sign({ mariageID: admin.mariageID }, jwt_secret);
                    res.status(200).json({auth: true, token: token});
                }
                else
                    res.status(201).json({auth: false, message: "Please check email/password."});
            })
        }
    });

}

exports.login = function(req, res) {

    Group.findOne({ 
        mail: req.body.mail
    },function(err, group){
        if(err)
            res.status(400).json({auth: false, message: err});
        else {
            bcrypt.compare(req.body.password, group.password, function(err, group) {
                if (group)
                {
                    var token = jwt.sign({ mariageID: mariage._id }, jwt_secret);
                    res.status(200).json({auth: true, token: token});
                }
                else
                    res.status(201).json({auth: false, message: "Please check email/password."});
            })
        }
    });

}