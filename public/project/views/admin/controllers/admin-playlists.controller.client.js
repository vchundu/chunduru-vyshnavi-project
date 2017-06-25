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
            })
    }
})();