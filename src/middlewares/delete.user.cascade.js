const Starter = require('../models/menu-entrée');
const Maincourse = require('../models/menu-plat');
const Dessert = require('../models/menu-dessert');
const GuestMenu = require('../models/menu-invité');
const Menu = require('../models/menu');
const Guest = require('../models/invite');
const Group = require('../models/groupe');
const Table = require('../models/table');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    jwt.verify(req.token, jwt_secret, function(err, decoded) {
        mariageSchema.pre('remove', function(next) {
            // 'this' is the client being removed. Provide callbacks here if you want
            // to be notified of the calls' result.
            Starter.remove({mariageID: this._id}).exec();
            Maincourse.remove({mariageID: this._id}).exec();
            Dessert.remove({mariageID: this._id}).exec();
            GuestMenu.remove({mariageID: this._id}).exec();
            Menu.remove({mariageID: this._id}).exec();
            Guest.remove({mariageID: this._id}).exec();
            Group.remove({mariageID: this._id}).exec();
            Table.remove({mariageID: this._id}).exec();
            Admin.remove({mariageID: this._id}).exec();
            next();
        });
    })
  };