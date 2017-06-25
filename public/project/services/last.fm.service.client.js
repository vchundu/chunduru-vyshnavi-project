(function() {
    angular
        .module('VSpotify')
        .factory('lastFmService', lastFmService);

    function lastFmService($http) {

        var apiKey = "75976284cdc3d5dddbf7f5ea3af59ca4";
        var apiRoot = "https://ws.audioscrobbler.com/2.0/";

        return {
            searchSongs : searchSongs,
            searchArtists : searchArtists,
            searchAlbums : searchAlbums,
            findAlbum: findAlbum,
            findSong: findSong,
            findArtist: findArtist,
            findArtistTopAlbums : findArtistTopAlbums,
            findArtistTopTracks :findArtistTopTracks
        };

        function searchSongs(searchText) {
            var url = apiRoot+"?method=track.search"
                +"&track="+searchText
                +"&api_key="+apiKey
                +"&format=json"
                +"&limit=10";
            return $http.get(url)
                .then(function(response) {
                    return response.data.results.trackmatches.track;
                })
        }

        function searchArtists(searchText) {
            var url = apiRoot+"?method=artist.search&artist="
                +searchText+"&api_key="+apiKey
                +"&format=json&limit=10";
            return $http.get(url)
                .then(function(response) {
                    return response.data.results.artistmatches.artist;
                });
        }

        function searchAlbums(searchText) {
            var url = apiRoot+"?method=album.search&album="
                +searchText+"&api_key="
                +apiKey+"&format=json&limit=10";

            return $http.get(url)
                .then(function(response) {
                    return response.data.results.albummatches.album;
                });
        }

        function findAlbum(artist, title) {
            var url = apiRoot+"?method=album.getInfo"
                + "&api_key="+apiKey
                + "&artist="+artist
                + "&album="+title
                + "&format=json";

            return $http.get(url)
                .then(function(response) {
                    return response.data.album;
                });
        }

        function findSong(title, artist) {
            var url = apiRoot+"?method=track.getInfo"
                    + "&api_key="+apiKey
                    + "&artist="+artist
                    + "&track="+title
                    + "&format=json";

            return $http.get(url)
                .then(function(response) {
                    return response.data.track;
                })
        }

        function findArtist(artist) {
            var url = apiRoot+"?method=artist.getInfo"
                    + "&artist="+artist
                    + "&api_key="+apiKey
                    + "&format=json";

            return $http.get(url)
                .then(function(response){
                    return response.data.artist;
                })
        }

        function findArtistTopAlbums(artistName) {
            var url = apiRoot+"?method=artist.gettopalbums"
                    + "&artist="+artistName
                    + "&api_key="+apiKey
                    + "&format=json";

            return $http.get(url)
                .then(function(response) {
                    return response.data.topalbums.album;
                })
        }

        function findArtistTopTracks(artistName) {
            var url = apiRoot+"?method=artist.gettoptracks"
                + "&artist="+artistName
                + "&api_key="+apiKey
                + "&format=json";

            return $http.get(url)
                .then(function(response) {
                    return response.data.toptracks.track;
                })
        }
    }
})();