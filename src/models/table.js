const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tableSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A value is required.'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
});

module.exports = mongoose.model('Table', tableSchema);