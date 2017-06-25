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
            createPlaylist : createPlaylist,
            removePlaylist: removePlaylist,
            updatePlaylist: updatePlaylist
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
            console.log('in client service');
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



    }
})();