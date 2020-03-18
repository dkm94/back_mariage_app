const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A name is required.'
    },
    role: {
        type: 'string',
        enum: ['admin', 'invité']
    },
    mail: {
        type: 'string',
        required: 'Your email is required',
        unique: true
    },
    password: {
        type: 'string',
        required: 'The password is required'
    },
    mariageID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }]

});

module.exports = mongoose.model('User', userSchema);