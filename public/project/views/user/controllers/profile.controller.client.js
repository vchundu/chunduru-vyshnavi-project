(function () {
    angular
        .module('VSpotify')
        .controller('profileController', profileController);

    function profileController(currentUser, logoutService, userService, playlistService) {
        var model = this;

        function init() {
            model.userId = currentUser._id;
            model.currentUser = currentUser;
            model.user = currentUser;

            model.followers = currentUser._followers.length;
            model.following = currentUser._following.length;
            // model.image = currentUser.image;
            model.image = "http://lorempixel.com/300/300/"
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
        init();

    }
})();