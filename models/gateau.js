const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cakeSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'A name is required.'
    },
    description: {
        type: 'string'
    }
    
});

module.exports = mongoose.model('Cake', cakeSchema);