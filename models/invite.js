const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guestSchema = new mongoose.Schema({

    mail: {
        type: 'string',
        required: 'Your email is required',
        unique: true
    },
    password: {
        type: 'string',
        required: 'The password is required'
    },
    firstName: {
        type: 'string',
        required: 'Your first name is required.'
    },
    lastName: {
        type: 'string',
        required: 'Your last name is required',
    },
    media: {
        type: 'string',
    },
    choiceID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Choice'
    }]
 
});

module.exports = mongoose.model('Guest', guestSchema);