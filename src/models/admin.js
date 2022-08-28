const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const Starter = require("./menu-entrée");
const Maincourse = require("./menu-plat");
const Dessert = require("./menu-dessert");
const Menu = require("./menu");
const Guest = require("./invite");
const Table = require("./table");
const Invitation = require('./invitation');
const Mariage = require('./mariage');

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
let adminSchema = new Schema({
    email: {
        type: 'string',
        required: 'Your email is required',
        unique: true,
        maxLength: 100
    },
    password: {
        type: 'string',
        required: 'The password is required',
        match: [regex, 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial.'],
        maxLength: 100
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

adminSchema.pre('remove', async function(next) {
    try {
        // 'this' = admin object
        await Invitation.deleteOne({mariageID: this.mariageID}).exec();
        await Starter.deleteMany({mariageID: this.mariageID}).exec();
        await Maincourse.deleteMany({mariageID: this.mariageID}).exec();
        await Dessert.deleteMany({mariageID: this.mariageID}).exec();
        await Menu.deleteOne({mariageID: this.mariageID}).exec();
        await Table.deleteMany({mariageID: this.mariageID}).exec();
        await Guest.deleteMany({mariageID: this.mariageID}).exec();
        await Mariage.deleteOne({adminID: this._id}).exec();
        next();
    } catch (error) {
        console.log(error)
    }
});

module.exports = model('Admin', adminSchema);