(function() {
    angular
        .module('VSpotify')
        .factory('playlistService', playlistService);

    function playlistService(songService, $http) {

        var playlists = [
            {"name": "Summer 2k17", "_id": "456", "_userCreated": "123", "public": true,
                "songs" : ["124245", "23", "456"]},
            {"name": "Summer Fcuk", "_id": "423", "_userCreated": "123", "public": false,
                "songs" : ["124245", "23", "456"]}
        ];

        return {
            findPlaylistsForUser: findPlaylistsForUser,
            findPublicPlaylistsForUser: findPublicPlaylistsForUser,
            findPlaylistById: findPlaylistById,
            findAlbumForSong: findAlbumForSong
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


    }
})();