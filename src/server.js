const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const db = process.env.MONGODB_URI;

const routes = require("./routes");

// const { deleteAccount } = require("./middlewares")

const app = express();

// Parse application data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bearerToken());

const corsOptions = {
  origin: ['https://my-wedding-app.netlify.app', 'http://localhost:3000'],
  credentials: true
}
app.use(cors(corsOptions));
// app.use(cors())

app.use("/api", routes);
app.use("/api/admin", routes);
app.use("/api/guest",  routes);

// app.use(deleteUser);


app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "https://my-wedding-app.netlify.app");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods","*");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // res.setHeader("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// BDD connection

const url = 'mongodb://mariage.uybvy.mongodb.net/mariage?retryWrites=true&w=majority'

mongoose
.connect(url, 
  {
    dbName: 'mariage',
    user: 'admin_mariage',
    pass: 'ImraN0iVQ92qEZhm',
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true}
);

// test
app.route('/').get(function(req, res) {
    res.send('hello world');
});
// const database = mongoose.connection
// database.once('open', _ => {
//   console.log('Database connected:', url)
// })

// database.on('error', err => {
//   console.error('connection error:', err)
// })

module.exports = app;