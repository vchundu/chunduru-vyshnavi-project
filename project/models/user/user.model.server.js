var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var playlistModel = require('../playlist/playlist.model.server');
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
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.followPlaylist = followPlaylist;
userModel.unfollowPlaylist = unfollowPlaylist;
userModel.addPlaylist = addPlaylist;
userModel.searchUsers = searchUsers;
userModel.findPlaylistsUserFollows = findPlaylistsUserFollows;

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
    return userModel
        .find();
}

function deleteUser(userId) {
    return userModel.remove({"_id": userId});
}

function updateUser(userId, user) {

    return userModel.update({_id: userId}, user);

}

function followUser(currentUserId, wantsToFollowId) {
    return userModel
        .findById(currentUserId)
        .then(function(user) {
            user._following.push(wantsToFollowId);
            user.save();
            return userModel.findById(wantsToFollowId);
        })
        .then(function(user) {
            user._followers.push(currentUserId);
            return user.save();
        });
}

function unfollowUser(currentUserId, wantsToUnfollowId) {
    return userModel
        .findById(currentUserId)
        .then(function(user) {
            var index = user._following.indexOf(wantsToUnfollowId);
            user._following.splice(index, 1);
            user.save();
            return userModel.findById(wantsToUnfollowId);
        })
        .then(function(user) {
            var index = user._followers.indexOf(currentUserId);
            user._followers.splice(index, 1);
            return user.save();
        });
}

function followPlaylist(userId, playlistId) {
    return userModel
        .findById(userId)
        .then(function(user) {
            user._playlists.push(playlistId);
            user.save();
            return playlistModel
                .addFollower(playlistId, userId);
        });

}

function unfollowPlaylist(userId, playlistId) {
    console.log('made it to user model');
    return userModel
        .findById(userId)
        .then(function(user) {
            var index = user._playlists.indexOf(playlistId);
            user._playlists.splice(index, 1);
            user.save();
            return playlistModel
                .removeFollower(playlistId, userId);
        });

}

function addPlaylist(userId, playlistId) {
    return userModel
        .findById(userId)
        .then(function(user) {
            user._playlists.push(playlistId);
            return user.save();
        }, function(error) {
        });
}

function searchUsers(searchText) {
    return userModel
        .find({$or : [{"username": searchText}, {"firstname": searchText}, {"lastname":searchText}]});
}

function findPlaylistsUserFollows(userId) {
    console.log('in model');
    return userModel
        .findById(userId)
        .populate("_playlists")
        .exec();
}
