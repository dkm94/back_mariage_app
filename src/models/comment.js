const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new mongoose.Schema({

    content: {
        type: String,
    }
 
});

module.exports = mongoose.model('Comment', commentSchema);