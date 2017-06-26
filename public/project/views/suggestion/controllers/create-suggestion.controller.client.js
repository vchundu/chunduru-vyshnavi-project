(function() {
    angular
        .module('VSpotify')
        .controller('createSuggestionController', createSuggestionController);

    function createSuggestionController(currentUser, playlistService,
                                        logoutService, suggestionService,
                                        $location) {
        var model = this;

        function init() {
            model.currentUser = currentUser;
            model.addSong = addSong;
            model.selectPlaylist = selectPlaylist;
            model.deselectPlaylist = deselectPlaylist;
            model.removeSong = removeSong;
            model.makeSuggestion = makeSuggestion;
            model.logout = logoutService.logout;
            model.songs = [];
            model.selectedPlaylists = [];
            playlistService
                .findOtherPublicPlaylists(currentUser._id)
                .then(function(playlists) {
                    model.publicPlaylists = playlists;
                });
        }
        init();

        function addSong(song) {
            var newSong = angular.copy(song);
            model.songs.push(newSong);
        }

        function removeSong(index) {
            model.songs.splice(index, 1);
        }

        function selectPlaylist(index) {
            var playlist = model.publicPlaylists.splice(index, 1)[0];
            model.selectedPlaylists.push(playlist);
        }

        function deselectPlaylist(index) {
            var playlist = model.selectedPlaylists.splice(index, 1)[0];
            model.publicPlaylists.push(playlist);
        }

        function makeSuggestion(songs, playlists) {
            var playlistIds = playlists.map(function(p) {
                return p._id;
            });

            suggestionService
                .createSuggestion(songs, playlistIds)
                .then(function(suggestion) {
                    for(var p in playlistIds) {
                        suggestionService
                            .suggestPlaylist(playlistIds[p], suggestion._id);
                    }

                    $location.url('/profile');
                });



        }
    }
})();