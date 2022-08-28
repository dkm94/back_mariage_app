const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let todolistSchema = new Schema({
    text: {
        type: String,
        required: 'A value is required.'
    },
    isCompleted: {
        type: Boolean,
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
})

module.exports = model('Todolist', todolistSchema)