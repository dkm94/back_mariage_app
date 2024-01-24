const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let foodSchema = new Schema({

    name: {
        type: String,
        maxLength: 100,
        required: 'Veuilez compléter le champ'
    },
    category: {
       type: String,
       enum: [ "apetizer", "starter", "maincourse", "dessert", "beverage"] 
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
    
});

module.exports = model('Food', foodSchema);