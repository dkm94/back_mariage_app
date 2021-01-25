const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dessertSchema = new mongoose.Schema({

    name: [{
        type: 'string'
    }],
    menuID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Menu'
    }]
    
});

module.exports = mongoose.model('Dessert', dessertSchema);