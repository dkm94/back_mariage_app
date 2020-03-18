const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A name is required.'
    },
    groupID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Group'
    }],
    mariageID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }]

});

module.exports = mongoose.model('List', listSchema);