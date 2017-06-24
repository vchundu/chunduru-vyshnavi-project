(function() {
    angular
        .module('VSpotify')
        .controller('artistController', artistController);

    function artistController(currentUser, $location,
                              $routeParams, lastFmService,
                              playlistService, logoutService) {
        var model = this;

        model.logout = logoutService.logout;
        model.goToAlbum = goToAlbum;
        var artistName = $routeParams['artistName'].replace("-", " ");

        if (currentUser !== '0') {
            model.currentUser = currentUser;
            playlistService
                .findPlaylistsForUser(currentUser._id);

        }

        lastFmService
            .findArtist(artistName)
            .then(function(artist) {
                console.log(artist);
                model.artist = artist;
                model.image = artist.image[3]['#text'];
            });

        lastFmService
            .findArtistTopAlbums(artistName)
            .then(function(albums) {
                console.log(albums);
                model.albums = albums;
            });

        lastFmService
            .findArtistTopTracks(artistName)
            .then(function(tracks) {
                model.tracks = tracks;
            });

        function goToAlbum(album) {
            var name = album.name.split(" ").join("-");
            $location.url('/album/'+name+'/'+$routeParams['artistName']);
        }

    }
})();