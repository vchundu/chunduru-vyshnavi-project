(function() {
    angular
        .module('VSpotify')
        .factory('searchService', searchService);

    function searchService(lastFmService) {

        return {
            searchSongs : lastFmService.searchSongs,
            searchAlbums : lastFmService.searchAlbums,
            searchArtists : lastFmService.searchArtists,
            searchPlaylists: searchPlaylists
        };

        function searchPlaylists(searchText) {
            var url = "/api/project/search/playlists/"+searchText;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function searchUsers(searchText) {
            var url = "/api/project/search/users/"+searchText;
            return $http.get(url)
                .then(function(response) {
                    return response.data
                })
        }
    }

})();