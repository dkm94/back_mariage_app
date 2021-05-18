const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

let operationSchema = new mongoose.Schema({
    
    title:{
        type: String
    },
    description: {
        type: String
    },
    price: { 
        type: Currency 
    },
    budgetID: {
        type: Schema.Types.ObjectId, 
        ref: 'Budget'
    }
    
});

module.exports = mongoose.model('Operations', operationSchema);