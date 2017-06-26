(function() {
    angular
        .module('VSpotify')
        .controller('otherUserController', otherUserController);

    function otherUserController(currentUser, $routeParams, userService, playlistService, logoutService) {
        var model = this;
        var otherUsername = $routeParams['username'];

        function init() {
            model.logout = logoutService.logout;
            model.followUser = followUser;
            model.unfollowUser = unfollowUser;

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
                    model.followers = user._followers.length;
                    model.following = user._following.length;
                    if (currentUser !== '0') {
                        model.showUnfollow = currentUser._following.indexOf(user._id) > -1;
                        model.showFollow = !model.showUnfollow;
                    }
                    return playlistService
                        .findPublicPlaylistsForUser(user._id);
                })
                .then(function(publicPlaylists) {
                    model.publicPlaylists = publicPlaylists;
                });
        }
        init();

        function followUser() {
            userService
                .followUser(currentUser._id, model.user._id)
                .then(function(response) {
                    model.showUnfollow = true;
                    model.showFollow = false;
                });
        }

        function unfollowUser() {
            userService
                .unfollowUser(currentUser._id, model.user._id)
                .then(function(response) {
                    model.showFollow = true;
                    model.showUnfollow = false;

                });
        }
    }
})();