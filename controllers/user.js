const User = require('../models/user'),
Utils = require('../utils');

exports.getAll = function(req, res) {
    let isAdmin = Utils.isAdmin(req.token);
    if (!isAdmin)
        res.status(401).json("You do not have administrators rights.");
    else {
        User.find({}, function(err, users) {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(users);
        });
    }
}

exports.getById = function(req, res) {
    let checkToken = Utils.validateToken(req.token);
    let dataToken = Utils.getTokenData(req.token);

    if (!checkToken)
        res.status(401).json('Access denied');
    else {
        User.find({_id: dataToken.id}, function(err, user) {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(user);
        });
    }
}
