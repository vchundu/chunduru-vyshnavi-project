var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var bcrypt = require("bcrypt-nodejs");
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;

module.exports = userModel;

function createUser(user) {
    user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByUsername(username) {
    return userModel.findOne({"username": username});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
    console.log('in database');
    return userModel.findOne({"username": username})
        .then(function(user) {
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        } else {
            return null;
        }
    });
}