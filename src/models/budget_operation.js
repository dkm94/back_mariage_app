const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

let operationSchema = new mongoose.Schema({
    
    category:{
        type: String,
        enum: [
            'Locations', 'Habillement/Beauté', 'Décoration/Fleurs', 'Alliances/Bijoux', 'Animation', 'Traiteur', 'Faire-part', 'Autres'
        ],
        default: 'Autres'
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