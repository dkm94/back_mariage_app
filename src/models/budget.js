const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let budgetSchema = new mongoose.Schema({
    
    currency: {
        type: String
    },
    operationsID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Operations'
    }],
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
    
});

module.exports = mongoose.model('Budget', budgetSchema);