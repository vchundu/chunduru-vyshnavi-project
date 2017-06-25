(function() {
    angular
        .module('VSpotify')
        .controller('playlistController', playlistController);

    function playlistController(playlistService, userService,
                                $routeParams, currentUser,
                                lastFmService, $location, logoutService) {
        var model = this;
        model.playlistId = $routeParams['playlistId'];

        function init() {
            model.logout = logoutService.logout;
            model.goToArtist = goToArtist;
            model.followPlaylist = followPlaylist;
            model.unfollowPlaylist = unfollowPlaylist;

            if(currentUser !== '0') {
                model.currentUser = currentUser;
            }

            model.userId = currentUser._id;

            playlistService
                .findPlaylistById(model.playlistId)
                .then(function(playlist) {
                    model.playlist = playlist;
                    return userService.findUserById(playlist._userCreated);
                })
                .then(function(user) {
                    model.user = user.username;
                    if (currentUser !== '0') {
                        model.showEdit = user._id === currentUser._id;
                        model.showFollow = user._id !== currentUser._id;
                        console.log(model.showFollow);
                    } else {
                        model.showEdit = false;
                        model.showFollow = false;
                    }
                });

            playlistService
                .findPlaylistsForUser(model.userId)
                .then(function(playlists) {
                    model.playlists = playlists;
                });

        }
        init();

        function goToArtist(song) {
            lastFmService
                .findSong(song.track, song.artist)
                .then(function(song) {
                    var artist= song.artist.name.replace(" ", "-");
                    $location.url('/artist/'+artist);
                });
        }

        function followPlaylist() {
            userService
                .followPlaylist(currentUser._id, model.playlistId)
                .then(function(response) {
                    model.showFollow = false;
                });
        }

        function unfollowPlaylist() {
            userService
                .unfollowPlaylist(currentUser._id, model.playlistId)
                .then(function(response) {
                    model.showFollow = true;
                });
        }

    }

})();