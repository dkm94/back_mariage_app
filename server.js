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


// Appel des routes 

// register admin
app.route('/auth/register').post(AuthController.register);

// login admin
app.route('/auth/adminLogin').post(AuthController.adminLogin);

// login invités
app.route('/auth/guestLogin').post(AuthController.guestLogin);


// admin
app.route('/admin/newGroup').post(AdminController.newGroup);
app.route('/admin/groups').get(AdminController.groups);
// app.route('/admin/group/:id').get(AdminController);
app.route('/admin/updateGroup/:id').put(AdminController.updateGroup);
// app.route('/admin/deleteGroup').delete(AdminController);

app.route('/admin/newTable').post(AdminController.newTable);
app.route('/admin/tables').get(AdminController.tables);
// app.route('/admin/table/:id').get(AdminController);
app.route('/admin/updateTable/:id').put(AdminController.updateTable);
// app.route('/admin/deleteTable').delete(AdminController);

app.route('/admin/newMenu').post(AdminController.newMenu);
app.route('/admin/menus').get(AdminController.menus);
// app.route('/admin/menu/:id').get(AdminController);
// app.route('/admin/updateMenu').put(AdminController);
// app.route('/admin/deleteMenu').delete(AdminController);

app.route('/admin/newCake').post(AdminController.newCake);
app.route('/admin/cakes').get(AdminController.cakes);
// app.route('/admin/cake/:id').get(AdminController);
// app.route('/admin/updateCake').put(AdminController);
// app.route('/admin/deleteCake').delete(AdminController);

// // groupe
// app.route('/group/addComment').post();
// app.route('/group/invites').get();


// // invite
// app.route('/invite/addChoice').post();
// app.route('/invite/choice').get();
// app.route('/invite/updateChoice').put();
// app.route('/invite/deleteChoice').delete();

// app.route('/invite/table/:id').get();


// app.route('/admin/:id').get(function(req, res){
    
//     User.findOne({
//         _id: req.params.id
//     }).populate('mariageID').exec(function(err, data){
//         if (err)
//             res.send(err)
//         else
//         res.send(data)
//     });
// });

app.route('/updateAdmin/:id').put(function(req, res){
    User.updateOne({_id: req.params.id},
    {$set: {mariageID: req.body['mariageID[]'], name: req.body.name}},
    function(err, data){
        if (err)
            res.send(err)
        else
            res.send(data)
    }
    );
});

app.route('/deleteAdmin/:id').delete(function(req, res) {

    User.deleteOne({
        _id: req.params.id
    }, function(err, result){
        if (err)
            res.send(err)
        else 
            res.send(result)
    });

});

// CRUD mariage

app.route('/mariage/:id').get(function(req, res){

    Mariage.findOne({
        _id: req.params.id
    }).populate('groupe ID tableID menuID cakeID', Mariage).exec(function(err, data){
        if (err)
            res.send(err)
        else
        res.send(data)
    });
});

app.route('/updateMariage/:id').put(function(req, res){
    Mariage.updateOne({_id: req.params.id},
    {$set: {name: req.body.name, userID: req.body.id}},
    function(err, data){
        if (err)
            res.send(err)
        else
            res.send(data)
    }
    );
});

// app.route('/deleteMariage/:id').delete(function(req, res) {

//     Mariage.deleteOne({
//         _id: req.params.id
//     }, function(err, result){
//         if (err)
//             res.send(err)
//         else 
//             res.send(result)
//     });

// });


// CRUD groups

app.route('/groups/:id').get(function(req, res){

    Group.findOne({
    }).populate('guestID').exec(function(err, data){
        if (err)
            res.send(err)
        else
        res.send(data)
    });
});

app.route('/updateGroup/:id').put(function(req, res){
    Group.updateOne({_id: req.params.id},
    {$set: {name: req.body.name}},
    function(err, data){
        if (err)
            res.send(err)
        else
            res.send(data)
    }
    );
});

app.route('/deleteGroup/:id').delete(function(req, res) {

    Group.deleteOne({
        _id: req.params.id
    }, function(err, result){
        if (err)
            res.send(err)
        else 
            res.send(result)
    });

});

// CRUD guests

app.route('/newGuest').post(function(req, res) {

    let group = new Group({
        name: req.body.name
    });

    group.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

});

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

app.route('/updateTable/:id').put(function(req, res){
    Table.updateOne({_id: req.params.id},
    {$set: {name: req.body.name}},
    function(err, data){
        if (err)
            res.send(err)
        else
            res.send(data)
    });
});

app.route('/deleteTable/:id').delete(function(req, res) {

    Table.deleteOne({
        _id: req.params.id
    }, function(err, result){
        if (err)
            res.send(err)
        else 
            res.send(result)
    });

});


// CRUD menu

app.route('/menus').get(function(req, res){

    Menu.find(function(err, data){
        if (err)
            res.send(err)
        else
        res.send(data)
    });
});

app.route('/updateMenu/:id').put(function(req, res){
    Menu.updateOne({_id: req.params.id},
    {$set: {
        name: req.body.name,
        description: req.body.description}},
    function(err, data){
        if (err)
            res.send(err)
        else
            res.send(data)
    });
});

app.route('/deleteMenu/:id').delete(function(req, res) {

    Menu.deleteOne({
        _id: req.params.id
    }, function(err, result){
        if (err)
            res.send(err)
        else 
            res.send(result)
    });

});


// CRUD cake

app.route('/cakes').get(function(req, res){

    Cake.find(function(err, data){
        if (err)
            res.send(err)
        else
        res.send(data)
    });
});

app.route('/updateCake/:id').put(function(req, res){
    Cake.updateOne({_id: req.params.id},
    {$set: {name: req.body.name}},
    function(err, data){
        if (err)
            res.send(err)
        else
            res.send(data)
    });
});

app.route('/deleteCake/:id').delete(function(req, res) {

    Cake.deleteOne({
        _id: req.params.id
    }, function(err, result){
        if (err)
            res.send(err)
        else 
            res.send(result)
    });

});





//Port 

app.listen(port, () => {
    console.log("Server listening on port " + port);
});