const express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
cors = require('cors'),
bearerToken = require('express-bearer-token'),
app = express(),
port = process.env.PORT || 3050;
require('dotenv').config();

// Parse application data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use(bearerToken());

// BDD connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mariage', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

//Récupération des modèles
let Mariage = require('./models/mariage');
let Admin = require('./models/admin');
let Group = require('./models/groupe');
let Guest = require('./models/invite');
let Choice = require('./models/choix');
let Table = require('./models/table');
let Menu = require('./models/menu');
let Cake = require('./models/gateau');
let Comment = require('./models/comment');

// test

app.route('/').get(function(req, res) {
    res.send('hello world');
});

// Appel des controllers

AuthController = require('./controllers/auth');
AdminController = require('./controllers/admin');
// GroupController = require('./controllers/group');
// GuestController = require('./controllers/guest');



// Appel des routes 

// register admin
app.route('/auth/register').post(AuthController.register);

// login admin
app.route('/auth/adminLogin').post(AuthController.adminLogin);

// login invités
app.route('/auth/guestLogin').post(AuthController.guestLogin);


// admin

app.route('/admin/:id').get(AdminController.adminID);
app.route('/updateAdmin/:id').put(AdminController.updateAdmin);
app.route('/deleteAdmin/:id').delete(AdminController.deleteAdmin);

app.route('/admin/mariage/:id').get(AdminController.mariageID);
app.route('/admin/updateMariage/:id').put(AdminController.updateMariage);

app.route('/admin/newGroup').post(AdminController.newGroup);
app.route('/admin/groups').get(AdminController.groups);
app.route('/admin/group/:id').get(AdminController.groupID);
app.route('/admin/updateGroup/:id').put(AdminController.updateGroup);
app.route('/admin/deleteGroup/:id').delete(AdminController.deleteGroup);

app.route('/admin/newGuest').post(AdminController.newGuest);
// app.route('/admin/guests').get(AdminController.guests);
// app.route('/admin/guest/:id').get(AdminController.guestID);
// app.route('/admin/updateGuest/:id').put(AdminController.updateGuest);
// app.route('/admin/deleteGuest/:id').delete(AdminController.deleteGuest);

app.route('/admin/newTable').post(AdminController.newTable);
app.route('/admin/tables').get(AdminController.tables);
app.route('/admin/table/:id').get(AdminController.tableID);
app.route('/admin/updateTable/:id').put(AdminController.updateTable);
app.route('/admin/deleteTable/:id').delete(AdminController.deleteTable);

app.route('/admin/newMenu').post(AdminController.newMenu);
app.route('/admin/menus').get(AdminController.menus);
app.route('/admin/menu/:id').get(AdminController.menuID);
app.route('/admin/updateMenu/:id').put(AdminController.updateMenu);
app.route('/admin/deleteMenu/:id').delete(AdminController.deleteMenu);

app.route('/admin/newCake').post(AdminController.newCake);
app.route('/admin/cakes').get(AdminController.cakes);
app.route('/admin/cake/:id').get(AdminController.cakeID);
app.route('/admin/updateCake/:id').put(AdminController.updateCake);
app.route('/admin/deleteCake/:id').delete(AdminController.deleteCake);

// // groupe
// app.route('/group/addComment').post();
// app.route('/group/invites').get();


// // invite
// app.route('/invite/addChoice').post();
// app.route('/invite/choice').get();
// app.route('/invite/updateChoice').put();
// app.route('/invite/deleteChoice').delete();

// app.route('/invite/table/:id').get();


// CRUD mariage

// app.route('/mariage/:id').get(function(req, res){

//     Mariage.findOne({
//         _id: req.params.id
//     }).populate('groupe ID tableID menuID cakeID', Mariage).exec(function(err, data){
//         if (err)
//             res.send(err)
//         else
//         res.send(data)
//     });
// });


// CRUD groups

// CRUD guests

app.route('/guests').get(function(req, res){

        Guest.find({
        }).populate('userID').exec(function(err, data){
            if (err)
                res.send(err)
            else
            res.send(data)
        });
});

app.route('/updateGuest/:id').put(function(req, res){
    Guest.updateOne({_id: req.params.id},
    {$set: {name: req.body.name}},
    function(err, data){
        if (err)
            res.send(err)
        else
            res.send(data)
    }
    );
});

app.route('/deleteGuest/:id').delete(function(req, res) {

    Guest.deleteOne({
        _id: req.params.id
    }, function(err, result){
        if (err)
            res.send(err)
        else 
            res.send(result)
    });

});


// CRUD tables

// CRUD menu

// CRUD cake

//Port 

app.listen(port, () => {
    console.log("Server listening on port " + port);
});