// Outer Requires
var app = require('../express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

app.use(bodyParser);

// Mongo
var connectionString = 'mongodb://localhost/webdev_assignment'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds141108.mlab.com:41108/heroku_m0fgmn47';
}
mongoose.connect(connectionString);



// Local Requires
require('./services/user.service.server');