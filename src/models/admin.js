const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new mongoose.Schema({

    email: {
        type: 'string',
        required: 'Your email is required',
        unique: true
    },
    password: {
        type: 'string',
        required: 'The password is required',
        minLength: 6,
        maxLength: 60
    },
    media: {
        type: 'string'
    },
    role: {
        type: 'string'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }

});

module.exports = mongoose.model('Admin', adminSchema);