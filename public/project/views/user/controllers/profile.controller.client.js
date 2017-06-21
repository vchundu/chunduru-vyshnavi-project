(function () {
    angular
        .module('VSpotify')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, playlistService) {
        var model = this;
        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);
        model.publicPlaylists = playlistService.findPublicPlaylistsForUser(model.userId);
        model.playlists = playlistService.findPlaylistsForUser(model.userId);

    }
})();