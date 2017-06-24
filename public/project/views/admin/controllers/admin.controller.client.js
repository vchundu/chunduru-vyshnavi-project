(function() {
    angular
        .module('VSpotify')
        .controller('adminController', adminController);

    function adminController(currentUser, logoutService) {
        var model =this;

        model.currentUser = currentUser;
        model.logout=logoutService.logout;
    }
})();