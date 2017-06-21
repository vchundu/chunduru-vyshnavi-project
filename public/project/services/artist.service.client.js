(function() {
    angular
        .module("VSpotify")
        .factory('artistService', artistService);

    function artistService() {
        var artists = [
            {"name" : "Meghan", "_id": "789", "_albums": ["123"]}
        ];

        return {
            findArtistById : findArtistById
        }

        function findArtistById(artistId) {
            for (var a in artists) {
                if (artists[a]._id === artistId) {
                    return artists[a];
                }
            }
            return null;
        }
    }
})();