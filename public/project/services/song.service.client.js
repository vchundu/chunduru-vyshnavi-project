(function() {
    angular
        .module('VSpotify')
        .factory('songService', songService);

    function songService(albumService) {
        var songs = [
            {"name": "mom", "_artist": "789", "_album": "123", "_id": "124245"}
        ];

        return {
            findAlbumForSong : findAlbumForSong
        };

        function findAlbumForSong(songId) {
            for (var s in songs) {
                if (songs[s]._id === songId) {
                    return albumService.findAlbumById(songs[s]._album);
                }
            }
            return null;
        }
    }
})();