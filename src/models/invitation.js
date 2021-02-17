const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let invitationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: 'A title is required.'
    },
    firstPerson: {
        type: String,
        required: 'A name is required.'
    },
    secondPerson: {
        type: String,
        required: 'A name is required.'
    },
    picture: {
        type: String
    },
    date: {
        type: Date,
        required: 'A date is required.'
    },
    place: [{
        name: { type: String },
        date: { type: Date },
        address: { type: String }
    }],
    infos: { type: String },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
    
});

module.exports = mongoose.model('Invitation', invitationSchema);