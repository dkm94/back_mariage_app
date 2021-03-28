// const Event = require("../models/évènement");
// const Invitation = require("../models/invitation");

// exports.events = (req, res, next) => {
//     const invitationId = res.locals.invitationID;
//     Event.find({ invitationID: invitationId })
//         .then(data => res.status(200).json(data))
//         .catch(err => res.status(400).json( err ))
// }

// exports.newEvent = (req, res, next) => {
//     const invitationId = res.locals.invitationID;
//     const newEvent = new Event ({
//         ...req.body,
//         invitationID: invitationId
//     })
//     newEvent.save()
//         .then(event => {
//             if(newEvent) {
//                 Invitation.updateOne({_id: req.params.id},
//                     {$push: {eventsID: event}})
//                     .then(data => res.status(200).json({ data}))
//                     .catch(err => res.status(400).json({err}))
//             } else
//                 res.status(400).json(err)
//         })
//         .catch(err => res.status(400).json(err))
// }

// exports.updateEvent = (req, res, next) => {
//     const invitationId = res.locals.invitationID;
//     Event.updateOne({_id: req.params.id},
//         {...req.body, invitationID: invitationId})
//     .then(() => res.status(200).json({ message: "Votre projet à été modifié."}))
//     .catch(err => res.status(400).json ( err ))
// }

// exports.deleteEvent = (req, res) => {
//     const invitationId = res.locals.invitationID;
//     Invitation.updateOne({ _id: invitationId }, {$pull: {eventsID: req.params.id}})
//     .then(data => {
//         if(data.nModified === 1){
//             Event.deleteOne({ _id: req.params.id })
//                 .then(data => res.status(200).json(data))
//                 .catch(err => res.status(400).json(err))
//         } else
//             return res.status(400).json('erreur deleted count')
//     })
//     .catch(err => res.status(400).json(err))
// }