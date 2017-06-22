var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    facebook: {
        id:    String,
        token: String
    },
    _following: [
        {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}
    ],
    roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}]
}, {collection: "user"});

module.exports =userSchema;
