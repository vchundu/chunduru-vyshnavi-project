(function() {
    angular
        .module('VSpotify')
        .controller('createPlaylistController', createPlaylistController);

    function createPlaylistController($location, currentUser, logoutService, playlistService) {
        var model = this;

        model.logout = logoutService.logout;
        model.songs = [];

        model.addSong = addSong;
        model.createPlaylist = createPlaylist;

        if (currentUser !== '0') {
            model.currentUser = currentUser;
        }

        function addSong(track, artist) {
            model.songs.push({"track": track, "artist":artist});
        }

        function createPlaylist(title, songs, isPublic) {
            console.log('in client');
            var playlist = {
                "_userCreated" : currentUser._id,
                "public": isPublic,
                "_songs": songs,
                "name": title,
                "_followedBy": []
            };

            playlistService
                .createPlaylist(playlist)
                .then(function(playlist) {
                    $location.url('/playlist/'+playlist._id);
                });
        }
    }
})();