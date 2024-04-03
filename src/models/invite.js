const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let guestSchema = new Schema({

    name: {
        type: String,
        required: 'A name is required.'
    },
    media: {
        type: String
    },
    family: {
        type: String,
        enum: ['1','2'],
    },
    tableID: {
        type: Schema.Types.ObjectId, 
        ref: 'Table'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
});

module.exports = model('Guest', guestSchema);