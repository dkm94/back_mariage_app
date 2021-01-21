import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let commentSchema = new mongoose.Schema({

    content: {
        type: 'string',
    }
 
});

module.exports = mongoose.model('Comment', commentSchema);