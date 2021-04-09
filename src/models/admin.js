const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
let adminSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: 'Your email is required',
        unique: true
    },
    password: {
        type: 'string',
        required: 'The password is required',
        match: [regex, 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial.']
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