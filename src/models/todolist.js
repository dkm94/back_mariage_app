const moongoose = require('mongoose');
const Schema = mongoose.Schema;

let todolistSchema = new.mongoose.Schema({
    text: {
        type: String,
        required: 'A task is required.'
    },
    color: {
        type: String
    },
    isComplete: {
        type: Boolean,
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
})

module.exports = moongoose.model('Todolist', todolistSchema)