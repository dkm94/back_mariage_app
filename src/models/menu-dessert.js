const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let dessertSchema = new Schema({

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

module.exports = model('Dessert', dessertSchema);