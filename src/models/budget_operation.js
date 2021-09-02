const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

let operationSchema = new mongoose.Schema({
    
    category:{
        type: String,
        enum: [
            'rental', 'clothing/beauty', 'decoration/flowers', 'jewelry', 'animation', 'caterer', 'wedding invitations', 'various'
        ],
        default: 'various'
    },
    description: {
        type: String
    },
    price: { 
        type: Number
    },
    budgetID: {
        type: Schema.Types.ObjectId, 
        ref: 'Budget'
    }
    
});

module.exports = mongoose.model('Operations', operationSchema);