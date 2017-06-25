(function() {
    angular
        .module('VSpotify')
        .controller('createPlaylistController', createPlaylistController);

    function createPlaylistController($location, currentUser, logoutService, playlistService) {
        var model = this;

        function init() {
            model.logout = logoutService.logout;
            model.songs = [];
            model.tags = [];

            model.addSong = addSong;
            model.createPlaylist = createPlaylist;
            model.addTag = addTag;

            if (currentUser !== '0') {
                model.currentUser = currentUser;
            }

        }
        init();

        function addSong(track, artist) {
            model.songs.push({"track": track, "artist":artist});
        }

        function createPlaylist(title, songs, isPublic, tags) {
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

            function addTag(tag) {
                model.tags.push(tag);
            }
        }
    }
})();