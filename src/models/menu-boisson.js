const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let beverageSchema = new Schema({

    name: {
        type: 'string',
        maxLength: 100,
        required: 'A value is required'
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

module.exports = model('Beverage', beverageSchema);