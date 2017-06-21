var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var bcrypt = require("bcrypt-nodejs");
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByUsername = findUserByUsername;

module.exports = userModel;

function createUser(user) {
    user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByUsername(username) {
    console.log('in db');
    return userModel.findOne({"username": username});
}
