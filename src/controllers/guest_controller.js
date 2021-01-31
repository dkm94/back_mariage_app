const GuestMenu = require('../models/menu-invité');
const Group = require('../models/groupe');
const Guest = require('../models/invite');

exports.newGuest = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    let guestmenu = new GuestMenu ({
        mariageID: mariageId
    });
    guestmenu.save()
        .then(newGuestMenu => {
            if(!newGuestMenu){
                res.status(400).json(err)
            } else {
                console.log(newGuestMenu)
                let guest = new Guest ({
                    ...req.body,
                    guestMenuID: newGuestMenu._id,
                    groupID: req.params.id,
                    mariageID: mariageId
                });
                guest.save()
                    .then(newGuest => {
                        if(!guest) {
                            res.status(400).json(err)
                        } else {
                            Group.updateOne({_id: req.params.id},
                                {$push: {guestID: newGuest}})
                                .then(data => res.status(200).json(data))
                                .catch(err => res.status(400).json(err))
                        }
                    })
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(400).json(err))
}

exports.guest = (req, res, next) => {
    Guest.findOne({ _id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.guests = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.find({mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.updateGuest = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Guest.updateOne({ _id: req.params.id},
        {$set: {...req.body, _id: req.params.id, mariageID: mariageId}})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err}))
}

exports.deleteGuest = (req, res) => {
    const mariageId = res.locals.mariageID;
    Guest.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => {
            console.log(data.deletedCount)
            if(data.deletedCount == 1){
                Group.updateMany({mariageID: mariageId}, {$pull: {guestID: req.params.id}})
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(400).json(err))
            } else
                return res.status(400).json('erreur deleted count')
        })
        .catch(err => res.status(400).json(err))
}

// exports.updateGuestMenu = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("You don't have the rights to do this action - update GuestMenu.")
//         else {
//             GuestMenu.updateOne({_id: req.params.id},
//                 {$set: {tableID: req.body.table, starterID: req.body.menu, dessertID: req.body.cake}},
//                 function(err, result){
//                     console.log(result)
//                     if (err)
//                         res.status(400).json("err update GuestMenu")
//                     else {
//                         Guest.updateOne({_id: decoded.guestID},
//                             function(err, result){
//                                 console.log(result)
//                                 if (err)
//                                     res.status(400).json('err update guest')
//                                 else {
//                                     Group.updateOne({_id: decoded.id},
//                                         function(err, result){
//                                             console.log(result)
//                                             if (err)
//                                                 res.status(400).json('err update group')
//                                             else {
//                                                 Mariage.updateOne({_id: decoded.mariageID},
//                                                     function(err, result){
//                                                         console.log(result)
//                                                         if (err)
//                                                             res.status(400).json('err update mariage')
//                                                         else
//                                                             res.status(200).json('Modifications effectuées.')
//                                                     })
//                                             }
                                
//                                         })
//                                 }
//                             })
//                     }
//                 }
//                 );
//             }
//         }
//     );
// }

// exports.getGuestMenuById = function (req, res) {
//     jwt.verify(req.token, jwt_secret, function(err, decoded) {
//         if (err)
//             res.status(400).json("You don't have the RIGHTS to do this action - GuestMenuID.")
//         else {
//             GuestMenu.findOne({
//                 _id: req.params.id
//             }, function(err, GuestMenu){
//                 if (err)
//                     res.status(400).json('err affichage choix')
//                 else
//                 res.send(GuestMenu)
//             });
//             }
//         }
//     );
// }