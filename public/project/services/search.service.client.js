(function() {
    angular
        .module('VSpotify')
        .factory('searchService', searchService);

    function searchService(lastFmService, $http) {

        return {
            searchSongs : lastFmService.searchSongs,
            searchAlbums : lastFmService.searchAlbums,
            searchArtists : lastFmService.searchArtists,
            searchPlaylists: searchPlaylists,
            searchUsers: searchUsers
        };

        function searchPlaylists(searchText) {
            var url = "/api/project/search/playlists/"+searchText;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function searchUsers(searchText) {
            console.log('in search users');
            var url = "/api/project/search/users/"+searchText;
            return $http.get(url)
                .then(function(response) {
                    return response.data
                })
        }
    }

})();