const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// function getDateOfToday(){
//     const date = new Date().toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
//     console.log(date)
//     return date;
// }

// function getHourOfEvent(){
//     const hour = new Date().toLocaleTimeString('fr-FR', { hour12: false, 
//         hour: "numeric", 
//         minute: "numeric"});
//     console.log(hour);
//     return hour
// }

const event = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

// console.log(event.toLocaleDateString('de-DE', options));
// expected output: Donnerstag, 20. Dezember 2012

// console.log(event.toLocaleDateString('fr-FR', options));
// expected output: الخميس، ٢٠ ديسمبر، ٢٠١٢

const formatted = event.toLocaleDateString(undefined, options);
// console.log(formatted);
// expected output: Thursday, December 20, 2012 (varies according to default locale)


let invitationSchema = new mongoose.Schema({

    title: {
        type: String,
        maxlength: [100, 'The address can\'t exceed 100 characters.'],
        // required: 'A title is required.'
    },
    firstPerson: {
        type: String,
        maxlength: [100, 'The address can\'t exceed 100 characters.'],
        required: 'A name is required.'
    },
    secondPerson: {
        type: String,
        maxlength: [100, 'The address can\'t exceed 100 characters.'],
        required: 'A name is required.'
    },
    picture: {
        type: String
    },
    date: {
        type: String,
        default: formatted
        // required: 'A date is required.'
    },
    eventsID: [{
        type: Schema.Types.ObjectId, 
        ref: 'Event'
    }],
    infos: { type: String },
    mariageID: {
        type: Schema.Types.ObjectId, 
        ref: 'Mariage'
    }
    
});

module.exports = mongoose.model('Invitation', invitationSchema);