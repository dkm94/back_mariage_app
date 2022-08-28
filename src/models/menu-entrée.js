const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let starterSchema = new mongoose.Schema({

    name: {
        type: 'string',
        maxLength: 100,
        required: 'A value is required'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }

});

module.exports = mongoose.model('Starter', starterSchema);