const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mariageSchema = new mongoose.Schema({

    firstPerson: {
        type: "string",
        maxLength: 100,
        required: true
    },
    secondPerson: {
        type: "string",
        maxLength: 100,
        required: true
    }
});

module.exports = mongoose.model('Mariage', mariageSchema);