const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guestSchema = new mongoose.Schema({

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
    groupID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Group'
    }],
    choiceID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Choice'
    }]
 
});

module.exports = mongoose.model('Guest', guestSchema);