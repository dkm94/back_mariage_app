const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A name is required.'
    },
    email: {
        type: 'string',
        required: 'Your email is required',
        unique: true
    },
    password: {
        type: 'string',
        required: 'The password is required'
    },
    guestID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Guest'
    }],
    // commentID: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Comment'
    // }],
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
 
});

module.exports = mongoose.model('Group', groupSchema);