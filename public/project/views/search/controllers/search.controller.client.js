(function() {
    angular
        .module('VSpotify')
        .controller('searchController', searchController);

    function searchController(currentUser, searchService) {
        var model = this;

        model.currentUser = currentUser;
        model.search = search;

        function search(searchTerm) {
            searchService
                .searchSongs(searchTerm)
                .then(function(songs) {
                    model.songs = songs;
                });

            searchService
                .searchAlbums(searchTerm)
                .then(function(albums) {
                    model.albums = albums;
                })
            searchService
                .searchArtists(searchTerm)
                .then(function(artists) {
                    model.artists =artists;
                })
        }
    }
})();