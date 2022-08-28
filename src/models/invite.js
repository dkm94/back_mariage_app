const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guestSchema = new mongoose.Schema({

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
        default: "1"
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

module.exports = mongoose.model('Guest', guestSchema);