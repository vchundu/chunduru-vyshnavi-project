(function() {
    angular
        .module('VSpotify')
        .controller('otherUserController', otherUserController);

    function otherUserController(currentUser, $routeParams, userService, playlistService, logoutService) {
        var model = this;
        var otherUsername = $routeParams['username'];

        if (currentUser !== '0') {
            model.currentUser = currentUser;
            model.showEdit = currentUser.username === otherUsername;

            playlistService
                .findPlaylistsForUser(currentUser._id)
                .then(function(playlists) {
                    model.playlists= playlists;
                });
        }

        userService
            .findUserByUsername(otherUsername)
            .then(function(user) {
                model.user = user;

                if (currentUser !== '0') {
                    model.isFollow = currentUser._following.indexOf(user._id) > -1;
                }
                return playlistService
                    .findPublicPlaylistsForUser(user._id);
            })
            .then(function(publicPlaylists) {
                model.publicPlaylists = publicPlaylists;
            });



        model.logout = logoutService.logout;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;

        function followUser() {
            userService
                .followUser(currentUser._id, model.user._id)
                .then(function(response) {
                    model.isFollow = true;
                });
        }

        function unfollowUser() {
            userService
                .unfollowUser(currentUser._id, model.user._id)
                .then(function(response) {
                    model.isFollow = false;
                });
        }
    }
})();