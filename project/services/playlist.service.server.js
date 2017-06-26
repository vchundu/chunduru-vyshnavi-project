var app = require('../../express');
var playlistModel = require('../models/playlist/playlist.model.server');

app.get('/api/project/user/:userId/playlist', findPlaylistsForUser);
app.get('/api/project/user/:userId/playlistPublic', findPublicPlaylistsForUser);
app.get('/api/project/playlist/:playlistId', findPlaylistById);
app.get('/api/project/admin/playlist/:playlistId', findPlaylistById);
app.get('/api/project/admin/playlists', findAllPlaylists);
app.get('/api/project/search/playlists/:searchText', searchPlaylists);
app.get('/api/project/playlists/other/:userId', findOtherPublicPlaylists);
app.get('/api/project/playlist/:playlistId/suggestions', findSuggestionsForPlaylist);

app.post('/api/project/playlist', createPlaylist);
app.post('/api/project/admin/playlist', createPlaylist);

app.put('/api/project/playlist/:playlistId', updatePlaylist);
app.put('/api/project/admin/playlist/:playlistId', updatePlaylist);
app.put("/api/project/suggestion/playlist/:playlistId/suggestion/:suggestionId", suggestPlaylist);
app.put("/api/project/playlist/:playlistId/suggestions/accept", acceptSuggestion);
app.put("/api/project/playlist/:playlistId/suggestions/discard/:suggestionId", discardSuggestion);

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

function findOtherPublicPlaylists(req, res) {
    var userId = req.params['userId'];

    playlistModel
        .findOtherPublicPlaylists(userId)
        .then(function(playlists) {
            res.json(playlists);
        }, function(error) {
            res.sendStatus(404);
        })
}

function findSuggestionsForPlaylist(req, res){
    var playlistId = req.params['playlistId'];

    playlistModel
        .findSuggestionsForPlaylist(playlistId)
        .then(function(playlist) {
            res.json(playlist._suggestions);
        }, function(error) {
            res.sendStatus(404);
        });
}

function createPlaylist(req, res) {
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

function suggestPlaylist(req, res) {
    var playlistId = req.params['playlistId'];
    var suggestionId = req.params['suggestionId'];

    playlistModel
        .suggestPlaylist(playlistId, suggestionId)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });
}

function acceptSuggestion(req, res) {
    console.log('in accept suggestion');
    var playlistId = req.params['playlistId'];
    var suggestion = req.body;
    playlistModel
        .acceptSuggestion(playlistId, suggestion)
        .then(function(playlist) {
            res.json(playlist);
        }, function(error) {
            res.sendStatus(404);
        });
}

function discardSuggestion(req, res) {
    var playlistId = req.params['playlistId'];
    var suggestionId = req.params['suggestionId'];
    playlistModel
        .discardSuggestion(playlistId, suggestionId)
        .then(function(response) {
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


