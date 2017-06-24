(function() {
    angular
        .module('VSpotify')
        .controller('generatePlaylistController', generatePlaylistController);

    function generatePlaylistController(playlistService, logoutService, currentUser) {
        var model =this;

        if (currentUser !== '0') {
            model.currentUser = currentUser;
        }

        model.tags = [];
        model.artists = [];

        model.addTag = addTag;
        model.addArtist = addArtist;
        model.removeTag = removeTag;
        model.removeArtist = removeArtist;
        model.createPlaylist = createPlaylist;
        model.logout = logoutService.logout;

        function addTag(tag) {
            model.tags.push(tag);
            model.newTag = "";
        }

        function addArtist(artist) {
            model.artists.push(artist);
            model.newArtist = "";
        }

        function removeTag(index) {
            model.tags.splice(index, 1);
        }

        function removeArtist(index) {
            model.artists.splice(index, 1);
        }

        function createPlaylist(title, time, tags, artists) {
            playlistService
                .createPlaylist(title, time, tags, artists)
                .then(function(playlist) {
                    console.log(playlist);
                })
        }
    }
})();