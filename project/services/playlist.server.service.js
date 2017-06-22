var app = require('../../express');
var playlistModel = require('../models/playlist/playlist.model.server');

app.get('/api/project/user/:userId/playlist', findPlaylistsForUser);
app.get('/api/project/user/:userId/playlistPublic', findPublicPlaylistsForUser);
app.get('/api/project/playlist/:playlistId', findPlaylistById);

function findPlaylistsForUser(req, res) {
    var userId = req.params['userId'];

    playlistModel
        .findPlaylistsForUser(userId)
        .then(function(playlists) {
            res.json(playlists);
        }, function(error) {
            res.sendStatus(404);
        });
}

function findPublicPlaylistsForUser(req, res) {
    var userId = req.params['userId'];

    playlistModel
        .findPublicPlaylistsForUser(userId)
        .then(function(playlists) {
            res.json(playlists);
        }, function(error) {
            res.sendStatus(404);
        });
}

function findPlaylistById(req, res) {

    var playlistId = req.params['playlistId'];

    playlistModel
        .findPlaylistById(playlistId)
        .then(function(playlist) {
            res.json(playlist);
        }, function(error) {
            res.sendStatus(404);
        });
}