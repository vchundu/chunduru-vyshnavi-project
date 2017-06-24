var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var bcrypt = require("bcrypt-nodejs");
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;

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
    return userModel.findOne({"username": username})
        .then(function(user) {
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        } else {
            return null;
        }
    });
}

function findAllUsers() {
    return userModel.find();
}

function deleteUser(userId) {
    return userModel.remove({"_id": userId});
}

function updateUser(userId, user) {

    return userModel.update({_id: userId}, {
        $set: {
            username: user.username,
            roles : user.roles
        }
    });
}
