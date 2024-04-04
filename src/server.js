const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = process.env.MONGODB_URI;

const routes = require("./routes");

const app = express();

// Parse application data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bearerToken());

mongoose
.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

const corsOptions = {
  origin: ['https://my-wedding-app.netlify.app', 'http://localhost:3000', 'https://mariage-en-main.com'],
  credentials: true
}
// const whitelist = ['https://my-wedding-app.netlify.app', 'http://localhost:3000']
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error())
//     }
//   },
// }

app.use(cors(corsOptions));
app.use("/api", routes);

module.exports = app;