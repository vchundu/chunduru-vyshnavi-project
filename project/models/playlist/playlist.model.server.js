var mongoose = require('mongoose');
var playlistSchema = require('./playlist.schema.server');
var playlistModel = mongoose.model('PlaylistModel', playlistSchema);

playlistModel.findPlaylistsForUser = findPlaylistsForUser;
playlistModel.findPublicPlaylistsForUser = findPublicPlaylistsForUser;
playlistModel.findPlaylistById = findPlaylistById;

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

