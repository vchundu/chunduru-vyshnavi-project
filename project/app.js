// Outer Requires
var app = require('../express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

app.use(bodyParser);

// Mongo
var connectionString = 'mongodb://localhost/webdev_assignment'; // for local
mongoose.connect(connectionString);

// Local Requires
require('./services/user.service.server');