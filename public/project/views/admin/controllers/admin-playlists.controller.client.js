(function() {
    angular
        .module('VSpotify')
        .controller('adminPlaylistsController', adminPlaylistsController);

    function adminPlaylistsController(currentUser, adminService, logoutService) {
        var model = this;

        model.logout = logoutService.logout;
        model.currentUser = currentUser;

        adminService
            .findAllPlaylists()
            .then(function(playlists) {
                model.playlists = playlists;
            });

        model.deletePlaylist = deletePlaylist;

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