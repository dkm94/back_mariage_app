const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let beverageSchema = new mongoose.Schema({

    name: {
        type: 'string',
        maxLength: 100,
        require: 'A value is required'
    },
    quantity: {
        type: Number,
        min: 1,
        max: 999
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }

});

module.exports = mongoose.model('Beverage', beverageSchema);