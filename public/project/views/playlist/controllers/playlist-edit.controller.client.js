(function() {
    angular
        .module('VSpotify')
        .controller('playlistEditController', playlistEditController);

    function playlistEditController(currentUser, $routeParams,
                                    $location, playlistService,
                                    logoutService, userService) {
        var model = this;
        var playlistId = $routeParams['playlistId'];

        function init() {
            model.logout = logoutService.logout;
            model.currentUser = currentUser;
            model.addSong = addSong;
            model.removeSong = removeSong;
            model.updatePlaylist = updatePlaylist;

            playlistService
                .findPlaylistById(playlistId)
                .then(function(playlist) {
                    if (playlist._userCreated !== currentUser._id) {
                        logoutService.logout();
                        $location.url('/login');
                    } else {
                        model.playlist = playlist;
                    }
                });

            playlistService
                .findPlaylistsForUser(currentUser._id)
                .then(function(playlists) {
                    model.playlists = playlists;
                });

            userService
                .findPlaylistsUserFollows(currentUser._id)
                .then(function(playlists) {
                    console.log('found playlists');
                    model.followPlaylists = playlists;
                });
        }
        init();

        function addSong(track, artist) {
            var song = {
                "track" : track,
                "artist" : artist
            };
            model.playlist._songs.push(song);
        }

        function removeSong(song) {
            var index = model.playlist._songs.indexOf(song);

            if (index > -1) {
                model.playlist._songs.splice(index, 1);
            }
        }

        function updatePlaylist(playlist) {
            console.log('in client');
            playlistService
                .updatePlaylist(playlistId, playlist)
                .then(function(playlist) {
                   $location.url('/playlist/'+playlistId);
                });
        }
    }
})();