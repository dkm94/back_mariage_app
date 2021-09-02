const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
const t = new Date();
const date = ('0' + t.getDate()).slice(-2);
const month = ('0' + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();
const time = `${date}/${month}/${year}`;

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
    date: {
        type: String,
        default: time
    },
    budgetID: {
        type: Schema.Types.ObjectId, 
        ref: 'Budget'
    }
    
});

module.exports = mongoose.model('Operations', operationSchema);