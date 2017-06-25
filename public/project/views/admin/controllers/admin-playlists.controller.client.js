(function() {
    angular
        .module('VSpotify')
        .controller('adminPlaylistsController', adminPlaylistsController);

    function adminPlaylistsController(currentUser, adminService, logoutService) {
        var model = this;

        function init() {
            adminService
                .findAllPlaylists()
                .then(function(playlists) {
                    model.playlists = playlists;
                });

            model.logout = logoutService.logout;
            model.currentUser = currentUser;
            model.deletePlaylist = deletePlaylist;
        }

        init();

        function deletePlaylist(playlist) {
            adminService
                .deletePlaylist(playlist._id)
                .then(function(response) {
                    var index = model.playlists.indexOf(playlist);
                    model.playlists.splice(index, 1);
                })
        }
    }
})();