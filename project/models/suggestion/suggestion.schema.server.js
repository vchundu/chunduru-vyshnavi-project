var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    track: String,
    artist: String
}, {_id: false});

var suggestionSchema = mongoose.Schema({
    songs: [songSchema],
    _playlists : [
        { type: mongoose.Schema.Types.ObjectId, ref: "PlaylistModel"}
    ]
}, {collection: "suggestion"});

module.exports = suggestionSchema;