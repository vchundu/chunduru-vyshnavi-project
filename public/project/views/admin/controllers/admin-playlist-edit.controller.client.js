(function() {
    angular
        .module('VSpotify')
        .controller('adminPlaylistEditController', adminPlaylistEditController);

    function adminPlaylistEditController(currentUser, adminService,
                                         logoutService, $routeParams,
                                         $location) {

        var model = this;
        var playlistId = $routeParams['playlistId'];

        function init() {
            model.currentUser = currentUser;
            model.logout = logoutService;

            adminService
                .findAllPlaylists()
                .then(function(playlists) {
                    model.playlists = playlists;
                });

            if (playlistId === "new") {
                model.title = "Create Playlist";
                model.isNew = true;
                model.playlist = {};
                model.playlist._userCreated = currentUser._id;
                model.playlist._songs = [];
            } else {
                model.title = "Edit Playlist";
                model.isNew = false;
                adminService
                    .findPlaylistById(playlistId)
                    .then(function(playlist) {
                        model.playlist=playlist;
                    })
            }

            model.updatePlaylist = updatePlaylist;
            model.createPlaylist = createPlaylist;
            model.addSong = addSong;
            model.removeSong = removeSong;
        }

        init();

        function updatePlaylist(playlist) {
            adminService
                .updatePlaylist(playlistId, playlist)
                .then(function(playlist) {
                    $location.url('/admin/playlists');
                })
        }

        function createPlaylist(playlist) {
            adminService
                .createPlaylist(playlist)
                .then(function(playlist) {
                    $location.url('/admin/playlists');
                })
        }

        function addSong(song) {
            model.playlist._songs.push(song);
        }

        function removeSong(index) {
            model.playlist._songs.splice(index, 1);
        }




    }
})();