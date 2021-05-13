const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formatted = event.toLocaleDateString(undefined, options);

let invitationSchema = new mongoose.Schema({

    title: {
        type: String
    },
    firstPerson_firstName: {
        type: String
    },
    firstPerson_lastName: {
        type: String
    },
    secondPerson_firstName: {
        type: String
    },
    secondPerson_lastName: {
        type: String
    },
    picture: {
        type: String
    },
    date: {
        type: String,
        default: formatted
    },
    rsvp: {
        type: String,
    },
    eventsID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Event'
    }],
    infos: { type: String },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
    
});

module.exports = mongoose.model('Invitation', invitationSchema);