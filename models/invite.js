import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let guestSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'Your first name is required.'
    },
    media: {
        type: 'string'
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