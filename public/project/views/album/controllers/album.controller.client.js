(function() {
    angular
        .module('VSpotify')
        .controller('albumController', albumController);

    function albumController($routeParams, albumService, playlistService) {
        var model = this;
        model.albumId = $routeParams['albumId'];
        model.userId = $routeParams['userId'];

        model.album = albumService.findAlbumById(model.albumId);
        model.playlists = playlistService.findPlaylistsForUser(model.userId);
    }
})();