const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new mongoose.Schema({
    eventTitle: { 
        type: String,
        maxlength: [50, 'The title can\'t exceed 50 caracters.'],
        required: [true, 'The title of the event is required'] 
    },
    eventPlace: { 
        type: String,
        maxlength: [100, 'The place can\'t exceed 100 caracters.'],
        required: [true, 'The place of the event is required'] 
     },
    eventTime: { 
        type: String,
        required: [true, 'The time of the event is required'] 
    },
    eventAddress: { type: String,
        maxlength: [300, 'The address can\'t exceed 300 caracters.'],
        required: [true, 'The address of the event is required'] 
    },
    invitationID: {
        type: Schema.Types.ObjectId, 
        ref: 'Invitation'
    }
})

module.exports = mongoose.model('Event', eventSchema);