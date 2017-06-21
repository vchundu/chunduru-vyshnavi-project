(function() {
    angular
        .module('VSpotify')
        .controller('playlistController', playlistController);

    function playlistController(playlistService, $routeParams, $location) {
        var model = this;

        model.userId =$routeParams['userId'];
        model.playlistId = $routeParams['playlistId'];
        model.playlist = playlistService.findPlaylistById(model.playlistId);
        model.playlists = playlistService.findPlaylistsForUser(model.userId);

        model.goToAlbum = goToAlbum;

        function goToAlbum(songId) {
            var album = playlistService.findAlbumForSong(songId);
            $location.url('user/'+model.userId+'/album/'+album._id);
        }

    }

})();