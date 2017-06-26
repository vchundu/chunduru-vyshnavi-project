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

            model.followerCount = currentUser._followers.length;
            model.followingCount = currentUser._following.length;

            model.showFollow = false;
            model.showUnfollow = false;
            model.showEdit = true;
            // model.image = currentUser.image;
            model.image = "http://lorempixel.com/300/300/";
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

            userService
                .findFollowing(currentUser._id)
                .then(function(following) {
                   model.following = following;
                });

            userService
                .findFollowers(currentUser._id)
                .then(function(followers) {
                    model.followers = followers;
                })

        }
        init();

    }
})();