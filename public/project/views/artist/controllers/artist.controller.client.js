(function() {
    angular
        .module('VSpotify')
        .controller('artistController', artistController);

    function artistController($routeParams, artistService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.artistId = $routeParams['artistId'];

        model.artist = artistService.findArtistById(model.artistId);
    }
})();