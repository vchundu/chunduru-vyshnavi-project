(function() {
    angular
        .module('VSpotify')
        .factory('songService', songService);

    function songService(albumService) {
        var songs = [
            {"name": "mom", "_artist": "789", "_album": "123", "_id": "124245"}
        ];


        var apiKey = "75976284cdc3d5dddbf7f5ea3af59ca4";
        var apiRoot = "https://ws.audioscrobbler.com/2.0/";

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

        function findSong(artist, title) {

        }
    }
})();