const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mariageSchema = new mongoose.Schema({

    firstPerson: {
        type: "string"
    },
    secondPerson: {
        type: "string"
    },
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
    todoListID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Todolist'
    }],
    adminID: {
        type: Schema.Types.ObjectId, 
        ref: 'Admin'
    }
    
});

module.exports = mongoose.model('Mariage', mariageSchema);