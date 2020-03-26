const Admin = require('../models/admin');
const Mariage = require('../models/mariage');
const Group = require('../models/groupe');
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = function(req, res) {
    
    let mariage = new Mariage ({
        name: req.body.name,
    });
    mariage.save(function(err, newMariage) {
        if (err)
            res.status(400).json('erreur création nouveau mariage');
        else {
            // res.status(200).json(newMariage);
            let hash = bcrypt.hashSync(req.body.password, 10);
            let admin = new Admin ({
                firstPerson: req.body.firstPerson,
                secondPerson: req.body.secondPerson,
                mail: req.body.mail,
                password: hash,
                mariageID: newMariage.id
            });

            admin.save(function(err, newAdmin){
                console.log(err);
                if (err)
                    res.status(400).json('échec création admin')
                else {
                    // res.status(200).json('compté créé avec succès.')
                    Mariage.updateOne({_id: mariage.id},
                        {$set: {adminID: newAdmin }}, function(err, data){
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json('mariage updated successfully')
                        })
                    }
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