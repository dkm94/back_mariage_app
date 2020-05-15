const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let choiceSchema = new mongoose.Schema({

tableID: {
    type: Schema.Types.ObjectId, 
    ref: 'Table'
},
menuID: {
    type: Schema.Types.ObjectId, 
    ref: 'Menu'
},
cakeID: {
    type: Schema.Types.ObjectId, 
    ref: 'Cake'
}
    
});

module.exports = mongoose.model('Choice', choiceSchema);