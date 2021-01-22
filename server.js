const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const app = express();
const PORT = process.env.PORT || 3050;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = process.env.MONGODB_URI;

// if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Parse application data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const corsOptions = {
  origin: 'https://my-wedding-app.netlify.app',
  credentials: true
}
app.use(cors(corsOptions));

app.use(bearerToken());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "https://my-wedding-app.netlify.app");
  
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
  
    // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Credentials", true);
  
    // Pass to next layer of middleware
    next();
  });

// BDD connection
mongoose
.connect(db || 'mongodb://localhost/mariage', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const Mariage = require('./models/mariage')
// test
app.route('/').get(function(req, res) {
    res.send('hello world');
});

app.route('/admins').get(function(req, res) {
  Mariage.find({}, (err, result) => {
      if (err){
        res.send(err)
      } else {
        res.send(result)
      }
      
    })
});

// Appel des controllers
AuthController = require('./controllers/auth');
AdminController = require('./controllers/admin');
GroupController = require('./controllers/groupe');
GuestController = require('./controllers/invite');
JoinController = require('./controllers/communes');


// Appel des routes 

// register + login
app.route('/auth/register').post(AuthController.register);
app.route('/auth/adminLogin').post(AuthController.adminLogin);
app.route('/auth/guestLogin').post(AuthController.guestLogin);

// admin
app.route('/admins/:id').get(AdminController.myAccount);
app.route('/updateAdmin/:id').put(AdminController.updateAdmin);
app.route('/deleteAdmin/:id').delete(AdminController.deleteAdmin);

app.route('/admin/mariage/:id').get(AdminController.mariageID);
app.route('/admin/updateMariage/:id').put(AdminController.updateMariage);

app.route('/admin/newGroup').post(AdminController.newGroup);
app.route('/admin/updateGroup/:id').put(AdminController.updateGroup);
app.route('/admin/deleteGroup/:id').delete(AdminController.deleteGroup);

app.route('/admin/newGuest/:id').post(AdminController.newGuest);
app.route('/admin/updateGuest/:id').put(AdminController.updateGuest);
app.route('/admin/deleteGuest/:id').delete(AdminController.deleteGuest);

app.route('/admin/newTable').post(AdminController.newTable);
app.route('/admin/updateTable/:id').put(AdminController.updateTable);
app.route('/admin/deleteTable/:id').delete(AdminController.deleteTable);

app.route('/admin/newMenu').post(AdminController.newMenu);
app.route('/admin/updateMenu/:id').put(AdminController.updateMenu);
app.route('/admin/deleteMenu/:id').delete(AdminController.deleteMenu);

app.route('/admin/newCake').post(AdminController.newCake);
app.route('/admin/updateCake/:id').put(AdminController.updateCake);
app.route('/admin/deleteCake/:id').delete(AdminController.deleteCake);

// // groupe
app.route('/group/addComment').post(GroupController.addComment);
app.route('/group/updateComment/:id').put(GroupController.updateComment);
app.route('/group/deleteComment/:id').delete(GroupController.deleteComment);

app.route('/group/updateGuest/:id').put(GroupController.updateGuest);
app.route('/group/deleteGuest/:id').delete(GroupController.deleteGuest);


// // invite
app.route('/guest/choice/:id').get(GuestController.getChoiceById);
app.route('/guest/updateChoice/:id').put(GuestController.updateChoice);


// Routes communes
app.route('/groups/:id').get(JoinController.getAllGroups);
app.route('/group/:id').get(JoinController.getGroupById);

app.route('/guests/:id').get(JoinController.getAllGuests);
app.route('/guest/:id').get(JoinController.getGuestByID);

app.route('/tables/:id').get(JoinController.getAllTables);
app.route('/table/:id').get(JoinController.getTableById);

app.route('/menus/:id').get(JoinController.getAllMenus);
app.route('/menu/:id').get(JoinController.getMenuById);

app.route('/cakes/:id').get(JoinController.getAllCakes);
app.route('/cake/:id').get(JoinController.getCakeById);

app.route('/getAllComments/:id').get(JoinController.getAllComments);
// app.route('/group/getCommentById/:id').get(GroupController.getCommentById);

//Port 

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});