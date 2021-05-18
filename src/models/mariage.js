const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mariageSchema = new mongoose.Schema({

    invitationID: {
        type: Schema.Types.ObjectId, 
        ref: 'Invitation'
    },
    // groupID: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Group'
    // }],
    guestID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Guest'
    }],
    tableID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Table'
    }],
    menuID: {
        type: Schema.Types.ObjectId, 
        ref: 'Menu'
    },
    budgetID: {
        type: Schema.Types.ObjectId, 
        ref: 'Budget'
    },
    adminID: {
        type: Schema.Types.ObjectId, 
        ref: 'Admin'
    }
    
});

module.exports = mongoose.model('Mariage', mariageSchema);