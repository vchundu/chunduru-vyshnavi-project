(function() {
    angular
        .module('VSpotify')
        .factory('playlistService', playlistService);

    function playlistService($http) {

        return {
            findPlaylistsForUser: findPlaylistsForUser,
            findPublicPlaylistsForUser: findPublicPlaylistsForUser,
            findOtherPublicPlaylists :findOtherPublicPlaylists,
            findPlaylistById: findPlaylistById,
            createPlaylist : createPlaylist,
            removePlaylist: removePlaylist,
            updatePlaylist: updatePlaylist,
            findSuggestionsForPlaylist: findSuggestionsForPlaylist,
            approveSuggestion : approveSuggestion,
            discardSuggestion : discardSuggestion
        };

        function findPlaylistsForUser(userId) {
            var url = "/api/project/user/"+userId+"/playlist";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findPublicPlaylistsForUser(userId) {
            var url = "/api/project/user/"+userId+"/playlistPublic";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findPlaylistById(playlistId) {
            var url = "/api/project/playlist/"+playlistId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function createPlaylist(playlist) {
            var url = "/api/project/playlist";
            return $http.post(url, playlist)
                .then(function(response) {
                    return response.data;
                });
        }

        function removePlaylist(playlistId) {
            var url = "/api/project/playlist/"+playlistId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function updatePlaylist(playlistId, playlist) {
            console.log('in client service');
            var url = "/api/project/playlist/"+playlistId;
            return $http.put(url, playlist)
                .then(function(response) {
                    return response.data;
                })
        }

        function findOtherPublicPlaylists(userId) {
            var url = "/api/project/playlists/other/"+userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findSuggestionsForPlaylist(playlistId) {
            var url = "/api/project/playlist/"+playlistId+"/suggestions";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function approveSuggestion(playlistId, suggestion) {
            var url = "/api/project/playlist/"+playlistId+"/suggestions/accept";
            return $http.put(url,suggestion)
                .then(function (response) {
                    return response.data;
                });
        }

        function discardSuggestion(suggestionId, playlistId) {
            var url = "/api/project/playlist/"+playlistId+"/suggestions/discard/"+suggestionId;
            return $http.put(url)
                .then(function(response) {
                    return response.data;
                });
        }



    }
})();