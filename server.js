const express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
cors = require('cors'),
bearerToken = require('express-bearer-token'),
app = express(),
port = process.env.PORT || 3000;
require('dotenv').config();

// Parse application data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use(bearerToken());

// BDD connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mariage', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// test
app.route('/').get(function(req, res) {
    res.send('hello world');
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
app.route('/groups').get(JoinController.getAllGroups);
app.route('/group/:id').get(JoinController.getGroupById);

app.route('/guests').get(JoinController.getAllGuests);
app.route('/guest/:id').get(JoinController.getGuestByID);

app.route('/tables').get(JoinController.getAllTables);
app.route('/table/:id').get(JoinController.getTableById);

app.route('/menus').get(JoinController.getAllMenus);
app.route('/menu/:id').get(JoinController.getMenuById);

app.route('/cakes').get(JoinController.getAllCakes);
app.route('/cake/:id').get(JoinController.getCakeById);

app.route('/getAllComments').get(JoinController.getAllComments);
// app.route('/group/getCommentById/:id').get(GroupController.getCommentById);

//Port 

app.listen(port, () => {
    console.log("Server listening on port " + port);
});