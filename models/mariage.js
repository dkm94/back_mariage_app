const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mariageSchema = new mongoose.Schema({

    title: {
        type: 'string',
        required: 'A name is required.'
    },
    media: {
        type: 'string'
    },
    groupID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Group'
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
    adminID: {
        type: Schema.Types.ObjectId, 
        ref: 'Admin'
    }
    
});

module.exports = mongoose.model('Mariage', mariageSchema);