var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
    name: String,
    _playlists: [
        {type: mongoose.Schema.Types.ObjectId, ref: "PlaylistModel"}
    ]
}, {collection: "tag"});

module.exports = tagSchema;