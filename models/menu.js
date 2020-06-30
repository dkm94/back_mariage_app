const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let menuSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A name is required.'
    },
    description: {
        type: 'string'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
    
});

module.exports = mongoose.model('Menu', menuSchema);