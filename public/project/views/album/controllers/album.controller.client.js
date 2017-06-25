(function() {
    angular
        .module('VSpotify')
        .controller('albumController', albumController);

    function albumController(currentUser, $routeParams, lastFmService, playlistService) {
        var model = this;

        if (currentUser !== '0') {
            model.currentUser = currentUser;
            model.userId = currentUser._id;
        }

        var albumArtist = $routeParams['albumArtist'].split("-").join(" ");
        var albumTitle = $routeParams['albumTitle'].split("-").join(" ");

        lastFmService
            .findAlbum(albumArtist, albumTitle)
            .then(function(album) {
                console.log(album);
                model.album = album;
                model.image = model.album.image[3]['#text'];
                model.songs = album.tracks.track;
            });

        playlistService
            .findPlaylistsForUser(model.userId)
            .then(function(playlists) {
                model.playlists = playlists;
            });
    }
})();