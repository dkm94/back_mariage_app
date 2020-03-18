const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mariageSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A name is required.'
    },
    media: {
        type: 'string'
    },
    listID: [{
        type: Schema.Types.ObjectId, 
        ref: 'List'
    }],
    tableID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Table'
    }],
    menuID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Menu'
    }],
    cakeID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Cake'
    }],
    userID: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }]
    
});

module.exports = mongoose.model('Mariage', mariageSchema);