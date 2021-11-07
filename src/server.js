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
// .then(res => console.log(res, "connecté"))
// .catch(err => console.log(err))

const corsOptions = {
  origin: ['https://my-wedding-app.netlify.app', 'http://localhost:3000'],
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
app.use("/api/admin", routes);
app.use("/api/guest",  routes);


app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// test
app.route('/').get(function(req, res) {
    res.send('hello world');
});

module.exports = app;