var app = require('../../express'); // this will go to the express.js file (get this from the video)
var userModel = require('../models/user/user.model.server');
var passport = require('passport');

// // local strategy
// var LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(localStrategy));
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);
//
// function

// facebook strategy

// calls
// gets
app.get('/api/project/username/user', findUserByUsername);
//posts
app.post('/api/project/register', register);

//functions
function findUserByUsername(req, res) {
    // var username = req.query['username'];
    console.log('in server');
    res.sendStatus(200);

    // userModel
    //     .findUserByUsername(username)
    //     .then(function(user) {
    //         if (user === null) {
    //             res.sendStatus(404)
    //         } else {
    //             res.json(user);
    //         }
    //     }, function(error) {
    //         res.sendStatus(404);
    //     });
}


function register(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
            // req.login(user, function (status) {
            //     res.json(user);
            // });
        });
}