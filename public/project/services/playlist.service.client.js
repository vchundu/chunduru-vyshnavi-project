(function() {
    angular
        .module('VSpotify')
        .factory('playlistService', playlistService);

    function playlistService(songService, $http) {

        return {
            findPlaylistsForUser: findPlaylistsForUser,
            findPublicPlaylistsForUser: findPublicPlaylistsForUser,
            findPlaylistById: findPlaylistById,
            findAlbumForSong: findAlbumForSong,
            createPlaylist : createPlaylist
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

        function findAlbumForSong(songId) {
            return songService.findAlbumForSong(songId);
        }

        function createPlaylist(playlist) {
            var url = "/api/project/playlist";
            return $http.post(url, playlist)
                .then(function(response) {
                    return response.data;
                })
        }


    }
})();