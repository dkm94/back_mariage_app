const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let menuSchema = new mongoose.Schema({

    starterID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Starter'
    }],
    main_courseID: [{
        type: Schema.Types.ObjectId, 
        ref: 'MainCourse'
    }],
    dessertID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Dessert'
    }],
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
    
});

module.exports = mongoose.model('Menu', menuSchema);