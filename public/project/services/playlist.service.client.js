(function() {
    angular
        .module('VSpotify')
        .factory('playlistService', playlistService);

    function playlistService(songService) {

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
            return playlists.filter(function(playlist) {
                return playlist._userCreated === userId;
            });
        }

        function findPublicPlaylistsForUser(userId) {
            return playlists.filter(function(playlist) {
                return playlist._userCreated === userId && playlist.public;
            });
        }

        function findPlaylistById(playlistId) {
            for (var p in playlists) {
                if (playlists[p]._id === playlistId) {
                    return playlists[p];
                }
            }
            return null;
        }

        function findAlbumForSong(songId) {
            return songService.findAlbumForSong(songId);
        }


    }
})();