const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let starterSchema = new mongoose.Schema({

    name: [{
        type: 'string'
    }],
    menuID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Menu'
    }]
    
});

module.exports = mongoose.model('Starter', starterSchema);