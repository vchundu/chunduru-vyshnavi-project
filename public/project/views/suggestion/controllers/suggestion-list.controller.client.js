(function() {
    angular
        .module('VSpotify')
        .controller('suggestionListController', suggestionListController);

    function suggestionListController(currentUser, $routeParams,
                                      playlistService, logoutService,
                                      suggestionService, $location) {
        var model = this;

        function init() {
            model.playlistId = $routeParams['playlistId'];
            model.getSongs = getSongs;
            model.logout = logoutService.logout;
            model.discardSuggestion = discardSuggestion;
            model.approveSuggestion = approveSuggestion;
            playlistService
                .findPlaylistById(model.playlistId)
                .then(function(playlist) {
                    if (playlist._userCreated !== currentUser._id) {
                        logoutService.logout();
                    } else {
                        model.currentUser = currentUser;
                    }
                });
            playlistService
                .findSuggestionsForPlaylist(model.playlistId)
                .then(function(suggestions) {
                    model.suggestions = suggestions;
                });

        }
        init();

        function getSongs(suggestion) {
            var songs = suggestion.songs;
            var songList = songs.map(function(song){
                return song.track + " by " + song.artist;
            });
            songList = songList.join(",");
            return songList;
        }

        function discardSuggestion(index) {
            var suggestion = model.suggestions.splice(index, 1)[0];
            playlistService
                .discardSuggestion(suggestion._id, model.playlistId)
                .then(function(response) {
                });
        }

        function approveSuggestion(index) {
            var suggestion = model.suggestions.splice(index, 1)[0];
            playlistService
                .approveSuggestion(model.playlistId, suggestion)
                .then(function(response) {
                    $location.url('/playlist/'+model.playlistId);
                })
        }
    }
})();