const Admin = require('../models/admin');
const Mariage = require("../models/mariage")
const Starter = require('../models/menu-entrée');
const Maincourse = require('../models/menu-plat');
const Dessert = require('../models/menu-dessert');
const GuestMenu = require('../models/menu-invité');
const Menu = require('../models/menu');
const Guest = require('../models/invite');
const Group = require('../models/groupe');
const Table = require('../models/table');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    // console.log('middleware suppression !')
    // try {
    //     Admin.pre('remove', function() {
    //         console.log('middleware mariageSchema.pre !')

    //         // 'this' is the client being removed. Provide callbacks here if you want
    //         // to be notified of the calls' result.
    //         // GuestMenu.remove({mariageID: this._id}).exec();
    //         Starter.deleteMany({mariageID: this._id}).exec();
    //         Maincourse.deleteMany({mariageID: this._id}).exec();
    //         Dessert.deleteMany({mariageID: this._id}).exec();
    //         Menu.deleteOne({mariageID: this._id}).exec();
    //         Guest.deleteMany({mariageID: this._id}).exec();
    //         // Group.remove({mariageID: this._id}).exec();
    //         Table.deleteMany({mariageID: this._id}).exec();
    //         Mariage.deleteMany({mariageID: this._id}).exec();
    //     })
    //     next();
    // } catch(err){
    //     next(err)
    // }
    // next()

  };