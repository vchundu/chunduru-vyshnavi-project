var app = require('../../express');
var playlistModel = require('../models/playlist/playlist.model.server');

app.get('/api/project/user/:userId/playlist', findPlaylistsForUser);
app.get('/api/project/user/:userId/playlistPublic', findPublicPlaylistsForUser);
app.get('/api/project/playlist/:playlistId', findPlaylistById);
app.get('/api/project/admin/playlist/:playlistId', findPlaylistById);
app.get('/api/project/admin/playlists', findAllPlaylists);
app.get('/api/project/search/playlists/:searchText', searchPlaylists);

app.post('/api/project/playlist', createPlaylist);
app.post('/api/project/admin/playlist', createPlaylist);

app.put('/api/project/playlist/:playlistId', updatePlaylist);
app.put('/api/project/admin/playlist/:playlistId', updatePlaylist);

app.delete('/api/project/playlist/:playlistId', deletePlaylist);
app.delete('/api/project/admin/playlist/:playlistId', deletePlaylist);

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

function findAllPlaylists(req, res) {
    playlistModel
        .findAllPlaylists()
        .then(function(playlists) {
            res.json(playlists);
        }, function(error) {
            res.sendStatus(404);
        });
}

function searchPlaylists(req, res) {
    var searchText = req.params['searchText'];
    playlistModel
        .searchPlaylists(searchText)
        .then(function(playlists) {
            res.json(playlists);
        }, function(error) {
            res.sendStatus(404);
        });
}

function createPlaylist(req, res) {
    console.log('in server');
    var playlist = req.body;
    playlistModel
        .createPlaylist(playlist)
        .then(function(playlist) {
            res.json(playlist);
        }, function(error) {
            res.sendStatus(404);
        })
}

function updatePlaylist(req, res) {
    console.log('made it into the update');
    var playlistId = req.params['playlistId'];
    var playlist = req.body;

    playlistModel
        .updatePlaylist(playlistId, playlist)
        .then(function(playlist) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });

}


function deletePlaylist(req, res) {
    var playlistId = req.params['playlistId'];

    playlistModel
        .deletePlaylist(playlistId)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        })
}


