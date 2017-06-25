(function() {
    angular
        .module('VSpotify')
        .controller('searchController', searchController);

    function searchController(currentUser, searchService, logoutService, $location) {
        var model = this;

        function init() {
            model.currentUser = currentUser;
            model.search = search;
            model.logout = logoutService.logout;
            model.getLink = getLink;

        }
        init();

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
                });

            searchService
                .searchArtists(searchTerm)
                .then(function(artists) {
                    model.artists =artists;
                });

            searchService
                .searchPlaylists(searchTerm)
                .then(function(playlists) {
                    model.playlists = playlists;
                })

            searchService
                .searchUsers(searchTerm)
                .then(function(users) {
                    model.users= users;
                })
        }

        function getLink(type, name) {
            name = name.split(" ").join("-");
            var url = "/"+type+'/'+name;
            console.log(url);
            $location.url(url);
        }
    }
})();