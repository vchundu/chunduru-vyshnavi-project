var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
    name: {type: String, require: true},
    _userCreated : {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    public: Boolean,
    _songs: [
        {
            title: {type: String, require: true},
            artist: {type: String, require: true}
        }
    ],
    _followedBy: [
        {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}
    ]
}, {collection: "user"});

module.exports = playlistSchema;
