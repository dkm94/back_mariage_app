const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let mariageSchema = new Schema({

    firstPerson: {
        type: "string",
        maxLength: 100,
        required: true
    },
    secondPerson: {
        type: "string",
        maxLength: 100,
        required: true
    },
    tableID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Table'
    }],
    todoListID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Todolist'
    }],
});

module.exports = model('Mariage', mariageSchema);