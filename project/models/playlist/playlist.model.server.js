var mongoose = require('mongoose');
var playlistSchema = require('./playlist.schema.server');
var playlistModel = mongoose.model('PlaylistModel', playlistSchema);
var userModel = require('../user/user.model.server');

playlistModel.findPlaylistsForUser = findPlaylistsForUser;
playlistModel.findPublicPlaylistsForUser = findPublicPlaylistsForUser;
playlistModel.findPlaylistById = findPlaylistById;
playlistModel.findAllPlaylists = findAllPlaylists;
playlistModel.createPlaylist = createPlaylist;
playlistModel.addFollower = addFollower;
playlistModel.removeFollower = removeFollower;
playlistModel.searchPlaylists = searchPlaylists;
playlistModel.deletePlaylist = deletePlaylist;
playlistModel.updatePlaylist = updatePlaylist;

module.exports = playlistModel;

function findPlaylistsForUser(userId) {
    return playlistModel.find({"_userCreated":userId});
}

function findPublicPlaylistsForUser(userId) {
    return playlistModel.find({"_userCreated": userId, "public": true});
}

function findPlaylistById(playlistId) {
    return playlistModel.findById(playlistId);
}

function findAllPlaylists() {
    return playlistModel.find();
}

function createPlaylist(playlist) {
    console.log('in model');
    return playlistModel
        .create(playlist);
}

function addFollower(playlistId, userId) {
    return playlistModel
        .findById(playlistId)
        .then(function(playlist) {
            playlist._followedBy.push(userId);
            return playlist.save();
        });
}

function removeFollower(playlistId, userId) {
    return playlistModel
        .findById(playlistId)
        .then(function(playlist) {
            var index = playlist._followedBy.indexOf(userId);
            playlist._followedBy.splice(index, 1);
            return playlist.save();
        });
}

function searchPlaylists(searchText) {
    return playlistModel.find({"name": searchText});
}

function deletePlaylist(playlistId) {
    return playlistModel.remove({"_id":playlistId});
}

function updatePlaylist(playlistId, playlist) {
    console.log('update playlist');
    return playlistModel.update({"_id":playlistId}, playlist);
}