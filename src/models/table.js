const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let tableSchema = new Schema({

    name: {
        type: String,
        required: 'Veuilez compléter le champ.'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    },
    guestID: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Guest'
        }
    
    ]
});

module.exports = model('Table', tableSchema);