const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guestMenuSchema = new mongoose.Schema({

starter: {
    type: Schema.Types.ObjectId, 
    ref: 'Starter'
},
main_course: {
    type: Schema.Types.ObjectId, 
    ref: 'MainCourse'
},
dessert: {
    type: Schema.Types.ObjectId, 
    ref: 'Dessert'
},
guestID: {
    type: Schema.Types.ObjectId, 
    ref: 'Guest'
},
    
});

module.exports = mongoose.model('GuestMenu', guestMenuSchema);