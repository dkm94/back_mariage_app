const Admin = require('../models/admin');
const Group = require('../models/groupe');
const jwt_secret = process.env.JWT_SECRET_KEY,
jwt = require('jsonwebtoken');

exports.newGroup = function (req, res) {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        if (err)
            res.status(400).json(err)
        else {
                Group.create({name: req.name, mariageID: decoded.id}, function(err, newGroup) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(201).json("The group has been created successfully.");
                })
            }
        }
    );
}