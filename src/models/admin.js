const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const Guest = require("./invite");
const Table = require("./table");
const Mariage = require('./mariage');
const Operation = require("./budget_operation");
const Food = require("./food");
const Todo = require("./todolist");

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
let adminSchema = new Schema({
    email: {
        type: String,
        required: 'Your email is required',
        unique: true,
        maxLength: 100
    },
    password: {
        type: String,
        required: 'The password is required',
        match: [regex, 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial.'],
        maxLength: 100
    },
    media: {
        type: String
    },
    role: {
        type: String
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }

});

adminSchema.pre('remove', async function(next) {
    try {
        // 'this' = admin object
        await Table.deleteMany({mariageID: this.mariageID}).exec();
        await Guest.deleteMany({mariageID: this.mariageID}).exec();
        await Operation.deleteMany({mariageID: this.mariageID}).exec();
        await Food.deleteMany({mariageID: this.mariageID}).exec();
        await Todo.deleteMany({mariageID: this.mariageID}).exec();
        await Mariage.deleteOne({adminID: this._id}).exec();
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

module.exports = model('Admin', adminSchema);