// const Admin = require('../models/admin');
// const Table = require('../models/table');
// const Mariage = require('../models/mariage');
// const Group = require('../models/groupe');
// const Entree = require('../models/menu-entrée');
// const Plat = require('../models/menu-plat');
// const Dessert = require('../models/menu-dessert');
// const Guest = require('../models/invite');
// const jwt_secret = process.env.JWT_SECRET_KEY;
// const jwt = require('jsonwebtoken')

// // READ Comments 
// exports.getAllComments = function (req, res) {
       
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("You don't have the rights to do this action - getAllComments.")
//         else {
//             Comment.find({
//                 mariageID: decoded.mariageID
//             }, function(err, comments){
//                 console.log(decoded)
//                 if (err)
//                     res.status(400).json('err affichage commentaires')
//                 else
//                     res.send(comments)
//             });
//         }
//     });
// }