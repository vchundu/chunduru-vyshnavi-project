(function() {
    angular
        .module('VSpotify')
        .controller('playlistController', playlistController);

    function playlistController(playlistService, userService, $routeParams, currentUser, lastFmService, $location, logoutService) {
        var model = this;

        model.userId = currentUser._id;
        model.playlistId = $routeParams['playlistId'];

        playlistService
            .findPlaylistById(model.playlistId)
            .then(function(playlist) {
                model.playlist = playlist;
                return userService.findUserById(playlist._userCreated);
            })
            .then(function(user) {
                model.user = user.username;
            });

        playlistService
            .findPlaylistsForUser(model.userId)
            .then(function(playlists) {
                model.playlists = playlists;
            });

        model.logout = logoutService.logout;
        model.goToArtist = goToArtist;

        function goToArtist(song) {
            lastFmService
                .findSong(song.track, song.artist)
                .then(function(song) {
                    var artist= song.artist.name.replace(" ", "-");
                    $location.url('/artist/'+artist);
                });
        }

    }

})();