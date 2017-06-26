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
                model.showUnfollow = false;
                model.showFollow = false;
            }

            model.userId = currentUser._id;

            playlistService
                .findPlaylistById(model.playlistId)
                .then(function(playlist) {

                    model.playlist = playlist;
                    model.suggestions = playlist._suggestions.length;
                    model.showSuggestions = playlist._userCreated === currentUser._id;

                    if (currentUser !== '0') {
                        model.showFollow = showFollow();
                        model.showUnfollow = showUnfollow();
                    }

                    return userService.findUserById(playlist._userCreated);
                })
                .then(function(user) {
                    model.user = user.username;
                    if (currentUser === '0') {
                        model.showEdit = false;
                        model.showFollow = false;
                        model.showUnfollow = false;
                    } else {
                        model.showEdit = user._id === currentUser._id;
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

        function showFollow() {
            return model.playlist._followedBy.indexOf(currentUser._id) === -1
                && currentUser._id !== model.playlist._userCreated;
        }

        function showUnfollow() {
            return !model.showFollow && currentUser._id !== model.playlist._userCreated;
        }

    }

})();