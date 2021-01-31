const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = process.env.MONGODB_URI;
// const auth = require("./middlewares/admin_auth");

const routes = require("./routes");

// const { deleteAccount } = require("./middlewares")

const app = express();

// Parse application data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use(auth)

app.use(bearerToken());

const corsOptions = {
  origin: 'https://my-wedding-app.netlify.app',
  credentials: true
}
app.use("/api", cors(corsOptions));

app.use("/api", routes);

// app.use(deleteUser);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://my-wedding-app.netlify.app");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  
  res.setHeader("Access-Control-Allow-Credentials", true);
  
  next();
  });

// BDD connection
mongoose
.connect(db || 'mongodb://localhost/mariage', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// test
app.route('/').get(function(req, res) {
    res.send('hello world');
});


module.exports = app;