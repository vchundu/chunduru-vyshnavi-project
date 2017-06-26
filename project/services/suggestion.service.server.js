var app = require('../../express'); // this will go to the express.js file (get this from the video)
var suggestionModel = require('../models/suggestion/suggestion.model.server');

app.post('/api/project/suggestion', createSuggestion);

function createSuggestion(req, res) {
    var suggestion = req.body;

    suggestionModel
        .createSuggestion(suggestion)
        .then(function(suggestion) {
            res.json(suggestion);
        }, function(error) {
            res.sendStatus(404);
        });
}