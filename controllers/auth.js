import Admin from '../models/admin';
import Mariage from '../models/mariage';
import Group from '../models/groupe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = function(req, res) {
    
    let mariage = new Mariage ({
        title: req.body.title
    });
    mariage.save(function(err, newMariage) {
        console.log(newMariage)
        if (err)
            res.status(400).json('erreur création nouveau mariage');
        else {
            // res.status(200).json(newMariage);
            let hash = bcrypt.hashSync(req.body.password, 10);
            let admin = new Admin ({
                firstPerson: req.body.firstPerson,
                secondPerson: req.body.secondPerson,
                email: req.body.email,
                password: hash,
                mariageID: newMariage._id,
                media: null
            });

            admin.save(function(err, newAdmin){
                console.log(newAdmin);
                if (err)
                    res.status(400).json('échec création admin')
                else {
                    Mariage.updateOne({_id: newMariage._id},
                        {$set: {adminID: newAdmin._id }}, function(err, data){
                            if (err)
                                res.status(400).json('err update mariage')
                            else
                                res.status(200).json(newAdmin)
                        }
                    )
                }
            });
        }    
    });
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