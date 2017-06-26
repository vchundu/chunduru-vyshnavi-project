var mongoose = require('mongoose');
var suggestionSchema = require('./suggestion.schema.server');
var suggestionModel = mongoose.model('SuggestionModel', suggestionSchema);

suggestionModel.createSuggestion = createSuggestion;

module.exports = suggestionModel;

function createSuggestion(suggestion) {
    return suggestionModel.create(suggestion);
}