(function () {
    angular
        .module('VSpotify')
        .factory('albumService', albumService);

    function albumService() {

        var albums = [
            {"_id" : "123", "songs": ["124245"], "name": "Thank you", "_artist": "789"}
        ];

        return {
            findAlbumById : findAlbumById
        };

        function findAlbumById(albumId) {
            for (var a in albums) {
                if (albums[a]._id === albumId) {
                    return albums[a];
                }
            }
            return null;
        }
    }
})();