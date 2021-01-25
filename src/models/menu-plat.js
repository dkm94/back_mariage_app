const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let maincourseSchema = new mongoose.Schema({

    name: {
        type: 'string'
    },
    menuID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Menu'
    }],
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
    
});

module.exports = mongoose.model('MainCourse', maincourseSchema);