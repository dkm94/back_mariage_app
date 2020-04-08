const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tableSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A name is required.'
    },
    guestID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Guest'
    }]
    
});

module.exports = mongoose.model('Table', tableSchema);