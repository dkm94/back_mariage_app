const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guestSchema = new mongoose.Schema({

    name: {
        type: String,
        required: 'A name is required.'
    },
    // email: {
    //     type: String,
    //     // required: 'Your email is required',
    //     // unique: true
    // },
    // password: {
    //     type: String,
    //     // required: 'The password is required'
    // },
    // role: {
    //     type: 'string'
    // },
    media: {
        type: String
    },
    // family: {
    //     type: String,
    //     enum: ['1','2'],
    //     default: '1'
    // },
    // groupID: {
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Group'
    // },
    guestMenu: {
        starter: {
            type: Schema.Types.ObjectId, 
            ref: 'Starter'
        },
        maincourse: {
            type: Schema.Types.ObjectId, 
            ref: 'Maincourse'
        },
        dessert: {
            type: Schema.Types.ObjectId, 
            ref: 'Dessert'
        }
    },
    tableID: {
        type: Schema.Types.ObjectId, 
        ref: 'Table'
    },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
 
});

module.exports = mongoose.model('Guest', guestSchema);