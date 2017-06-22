(function () {
    angular
        .module('VSpotify')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, playlistService) {
        var model = this;
        model.userId = currentUser._id;

        userService
            .findUserById(model.userId)
            .then(function(user) {
                model.user = user;
            });

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

        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function(response){
                    $location.url('/');
                });

        }
    }
})();