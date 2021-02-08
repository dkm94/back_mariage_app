const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new mongoose.Schema({

    firstPerson: {
        type: 'string',
        required: 'A name is required.'
    },
    secondPerson: {
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