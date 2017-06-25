(function () {
    angular
        .module('VSpotify')
        .controller('profileEditController', profileEditController);

    function profileEditController(currentUser, userService,
                                   logoutService, $routeParams,
                                   playlistService, $location) {
        var model = this;

        model.logout = logoutService.logout;
        model.currentUser = currentUser;

        if (currentUser.username !== $routeParams['username']) {
            logoutService.logout();
        }

        playlistService
            .findPlaylistsForUser(currentUser._id)
            .then(function(playlists) {
                model.playlists = playlists;
            });

        model.showEdit = showEdit;
        model.updateUser = updateUser;
        model.removePlaylist = removePlaylist;

        function showEdit(playlist) {
            return playlist._userCreated === currentUser._id;
        }

        function updateUser(user) {
            userService
                .updateUser(currentUser._id, user)
                .then(function(user) {
                    $location.url('/profile');
                })
        }

        function removePlaylist(playlist){
            playlistService
                .removePlaylist(playlist._id)
                .then(function(response) {
                    var index = model.playlists.indexOf(playlist);
                    model.playlists.splice(index, 1);
                });
        }


    }
})();