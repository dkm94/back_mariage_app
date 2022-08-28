const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let tableSchema = new Schema({

    name: {
        type: 'string',
        required: 'A value is required.'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
});

module.exports = model('Table', tableSchema);