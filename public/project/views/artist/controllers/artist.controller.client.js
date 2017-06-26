(function() {
    angular
        .module('VSpotify')
        .controller('artistController', artistController);

    function artistController(currentUser, $location,
                              $routeParams, lastFmService,
                              playlistService, logoutService) {
        var model = this;
        var artistName = $routeParams['artistName'].replace("-", " ");

        function init() {
            model.logout = logoutService.logout;
            model.goToAlbum = goToAlbum;

            if (currentUser !== '0') {
                model.currentUser = currentUser;
                playlistService
                    .findPlaylistsForUser(currentUser._id)
                    .then(function(playlists) {
                        model.playlists = playlists;
                    })

            }

            lastFmService
                .findArtist(artistName)
                .then(function(artist) {
                    model.artist = artist;
                    console.log(model.artist);
                    model.image = artist.image[3]['#text'];
                });

            lastFmService
                .findArtistTopAlbums(artistName)
                .then(function(albums) {
                    model.albums = albums;
                });

            lastFmService
                .findArtistTopTracks(artistName)
                .then(function(tracks) {
                    model.tracks = tracks;
                });

        }
        init();

        function goToAlbum(album) {
            var name = album.name.split(" ").join("-");
            $location.url('/album/'+name+'/'+$routeParams['artistName']);
        }

    }
})();