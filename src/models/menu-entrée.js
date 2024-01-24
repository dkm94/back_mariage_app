const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let starterSchema = new Schema({

    name: {
        type: String,
        maxLength: 100,
        required: 'Veuilez compléter le champ'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }

});

module.exports = model('Starter', starterSchema);