const User = require('../models/user'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = function(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10);
    let user = new User({
        name: req.body.name,
        mail: req.body.mail,
        password: hash,
        role: req.body.role
    });

    user.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

}

exports.login = function(req, res) {

    User.findOne({ 
        mail: req.body.mail
    },function(err, user){
        if(err)
            res.status(400).json({auth: false, message: err});
        else if (!user)
            res.status(401).json({auth: false, message: "User not found. Please check email/password."});
        else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result)
                {
                    var token = jwt.sign({ id: user._id, role: user.role }, jwt_secret);
                    res.status(200).json({auth: true, token: token});
                }
                else
                    res.status(201).json({auth: false, message: "Please check email/password."});
            })
        }
    });

}
