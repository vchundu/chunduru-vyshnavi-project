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
playlistModel.findOtherPublicPlaylists = findOtherPublicPlaylists;
playlistModel.suggestPlaylist = suggestPlaylist;
playlistModel.findSuggestionsForPlaylist = findSuggestionsForPlaylist;
playlistModel.acceptSuggestion = acceptSuggestion;
playlistModel.discardSuggestion = discardSuggestion;

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
    return playlistModel
        .find()
        .populate("_userCreated")
        .exec();
}

function createPlaylist(playlist) {
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

function findOtherPublicPlaylists(userId) {
    return playlistModel.find({"_userCreated" : {'$ne': userId}, "public": true})
        .populate('_userCreated')
        .exec();
}

function suggestPlaylist(playlistId, suggestionId) {
    return playlistModel
        .findById(playlistId)
        .then(function(playlist) {

            playlist._suggestions.push(suggestionId);
            return playlist.save();
        });
}

function findSuggestionsForPlaylist(playlistId) {
    return playlistModel
        .findById(playlistId)
        .populate("_suggestions")
        .exec();
}

function acceptSuggestion(playlistId, suggestion) {
    console.log('inside model');
    return playlistModel
        .findById(playlistId)
        .then(function(playlist) {
            console.log('inside function');
            var index = playlist._suggestions.indexOf(suggestion._id);
            playlist._suggestions.splice(index, 1);
            console.log(suggestion.songs);
            for (song in suggestion.songs) {
                playlist._songs.push(suggestion.songs[song]);
            }
            console.log(playlist._songs);
            return playlist.save();
        });
}

function discardSuggestion(playlistId, suggestionId) {
    return playlistModel
        .findById(playlistId)
        .then(function(playlist) {
            var index = playlist._suggestions.indexOf(suggestionId);
            playlist._suggestions.splice(index, 1);
            return playlist.save();
        });
}