const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
require('mongoose-currency').loadType(mongoose);
const t = new Date();
const date = ('0' + t.getDate()).slice(-2);
const month = ('0' + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();
const time = `${date}/${month}/${year}`;

let operationSchema = new Schema({
    
    category:{
        type: String,
        enum: [
            'Locations', 'Habillement/Beauté', 'Décoration/Fleurs', 'Alliances/Bijoux', 'Animation', 'Traiteur', 'Faire-part', 'Autres'
        ],
        default: 'Autres'
    },
    description: {
        type: String,
        maxlength: 255
    },
    price: { 
        type: Number,
        min: 1,
        max: 999999
    },
    date: {
        type: String,
        default: time
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
});

module.exports = model('Operations', operationSchema);