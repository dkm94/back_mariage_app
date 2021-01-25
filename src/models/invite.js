const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guestSchema = new mongoose.Schema({

    name: {
        type: 'string',
        required: 'Your first name is required.'
    },
    media: {
        type: 'string'
    },
    groupID: {
        type: Schema.Types.ObjectId, 
        ref: 'Group'
    },
    guestMenuID: {
        type: Schema.Types.ObjectId, 
        ref: 'GuestMenu'
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