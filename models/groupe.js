const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A name is required.'
    },
    guestID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Invite'
    }],
    commentID: {
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    },
    userID: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    mariageID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }]
 
});

module.exports = mongoose.model('Group', groupSchema);