(function() {
    angular
        .module('VSpotify')
        .factory('suggestionService', suggestionService);

    function suggestionService($http) {
        return {
            createSuggestion: createSuggestion,
            suggestPlaylist : suggestPlaylist
        };

        function createSuggestion(songs, playlistIds) {

            var suggestion = {
                "songs" : songs,
                "_playlists" : playlistIds
            };
            var url = "/api/project/suggestion";
            return $http.post(url, suggestion)
                .then(function(response) {
                    return response.data;
                });

        }

        function suggestPlaylist(playlistId, suggestionId) {
            var url = "/api/project/suggestion/playlist/"+playlistId+"/suggestion/"+suggestionId;
            return $http.put(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();