(function () {
    angular
        .module('VSpotify')
        .controller('profileController', profileController);

    function profileController(currentUser, logoutService, userService, playlistService) {
        var model = this;
        model.userId = currentUser._id;
        model.currentUser = currentUser;
        model.user = currentUser;
        model.image = currentUser.image;

        playlistService
            .findPublicPlaylistsForUser(model.userId)
            .then(function(publicPlaylists) {
                model.publicPlaylists = publicPlaylists;
            });

        playlistService
            .findPlaylistsForUser(model.userId)
            .then(function(playlists) {
                model.playlists = playlists;
            });

        model.logout = logoutService.logout;
    }
})();