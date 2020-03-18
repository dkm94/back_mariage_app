const express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
jwt_secret = process.env.JWT_SECRET_KEY,
cors = require('cors'),
app = express(),
port = process.env.PORT || 3000;
require('dotenv').config();

// Parse application data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

// BDD connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mariage', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

//Récupération des modèles
let Mariage = require('./models/mariage');
let User = require('./models/user');
let List = require('./models/list');
let Group = require('./models/groupe');
let Guest = require('./models/invite');
let Choice = require('./models/choix');
let Table = require('./models/table');
let Menu = require('./models/menu');
let Cake = require('./models/gateau');
let Comment = require('./models/comment');

// Déclarations des routes

app.route('/').get(function(req, res) {
    res.send('hello world');
});

// connection / register 

app.route('/register').post(function(req, res) {

    let user = new User({
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        role: req.body.role
    });

    user.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

});

// app.route('/login').post(function(req, res) {

//     User.findOne({ 
//         mail: req.body.mail
//     },function(err, data){
//         if(err)
//             res.send('user not found')
//         else
//             res.send(data)
//     });

// });

app.route('/login').post(function(req, res) {

    User.findOne({ 
        mail: req.body.mail
    },function(err, user){
        if(err)
            res.status(400).json({auth: false, message: err});
        else if (!user)
            res.status(401).json({auth: false, message: "User not found. Please check email/password."});
        else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result)
                {
                    var token = jwt.sign({ id: user._id, role: user.role }, jwt_secret);
                    res.status(200).json({auth: true, token: token});
                }
                else
                    res.status(201).json({auth: false, message: "Please check email/password."});
            })
        }
    });

});

// CRUD user

// app.route('/newUser').post(function(req, res) {

//     let user = new User({
//         name: req.body.name,
//         mail: req.body.mail,
//         password: req.body.password
//     });

//     user.save(function(err, data) {
//         if(err)
//             res.send(err)
//         else
//             res.send(data)
//     });

// });

app.route('/users').get(function(req, res){
    
        User.find(function(err, data){
            if (err)
                res.send(err)
            else
            res.send(data)
        });
});

app.route('/users/:id').get(function(req, res){
    
    User.findOne({
        _id: req.params.id
    }).populate('mariageID').exec(function(err, data){
        if (err)
            res.send(err)
        else
        res.send(data)
    });
});

app.route('/updateUser/:id').put(function(req, res){
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

app.route('/deleteUser/:id').delete(function(req, res) {

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

app.route('/newMariage').post(function(req, res) {

    let mariage = new Mariage({
        name: req.body.name,
        userID: req.body.id
    });

    mariage.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

});

app.route('/mariages').get(function(req, res){

        Mariage.find(function(err, data){
            if (err)
                res.send(err)
            else
            res.send(data)
        });
});

app.route('/mariages/:id').get(function(req, res){

    Mariage.findOne({
        _id: req.params.id
    }).populate('listID tableID menuID cakeID', Mariage).exec(function(err, data){
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

app.route('/deleteMariage/:id').delete(function(req, res) {

    Mariage.deleteOne({
        _id: req.params.id
    }, function(err, result){
        if (err)
            res.send(err)
        else 
            res.send(result)
    });

});


// CRUD list 

app.route('/newList').post(function(req, res) {

    let list = new List({
        name: req.body.name,
        mariageID: req.body.id
    });

    list.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

});

app.route('/lists').get(function(req, res){

        List.find({
        }).populate('groupID').exec(function(err, data){
            if (err)
                res.send(err)
            else
            res.send(data)
        });
});

app.route('/list/:id').get(function(req, res){

    List.findOne({
    }).populate('mariageID').exec(function(err, data){
        if (err)
            res.send(err)
        else
        res.send(data)
    });
});

app.route('/updateList/:id').put(function(req, res){
    List.updateOne({_id: req.params.id},
        {$set: {name: req.body.name}},
    function(err, data){
        if (err)
            res.send(err)
        else
            res.send(data)
    }
    );
});

app.route('/deleteList/:id').delete(function(req, res) {

    List.deleteOne({
        _id: req.params.id
    }, function(err, result){
        if (err)
            res.send(err)
        else 
            res.send(result)
    });

});


// CRUD groups

app.route('/newGroup').post(function(req, res) {

    let group = new Group({
        name: req.body.name,
        mariageID: req.body['mariageID[]']
    });

    group.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

});

app.route('/groups').get(function(req, res){

        Group.find({
        }).populate('userID').exec(function(err, data){
            if (err)
                res.send(err)
            else
            res.send(data)
        });
});

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

app.route('/newTable').post(function(req, res) {

    let table = new Table({
        name: req.body.name,
    });

    table.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

});

app.route('/tables').get(function(req, res){

    Table.find({
    }).populate('userID').exec(function(err, data){
        if (err)
            res.send(err)
        else
        res.send(data)
    });
});

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

app.route('/newMenu').post(function(req, res) {

    let menu = new Menu({
        name: req.body.name,
        description: req.body.description
    });

    menu.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

});

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

app.route('/newCake').post(function(req, res) {

    let cake = new Cake({
        name: req.body.name,
    });

    cake.save(function(err, data) {
        if(err)
            res.send(err)
        else
            res.send(data)
    });

});

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