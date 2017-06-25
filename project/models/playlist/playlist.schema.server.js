var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    track: String,
    artist: String
}, {_id: false});

var playlistSchema = mongoose.Schema({
    name: {type: String, require: true},
    _userCreated : {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    public: Boolean,
    _songs: [songSchema],
    _followedBy: [
        {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}
    ]
}, {collection: "playlist"});

module.exports = playlistSchema;
