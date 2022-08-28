const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let apetizerSchema = new mongoose.Schema({

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

module.exports = mongoose.model('Apetizer', apetizerSchema);