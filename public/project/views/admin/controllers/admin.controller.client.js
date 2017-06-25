(function() {
    angular
        .module('VSpotify')
        .controller('adminController', adminController);

    function adminController(currentUser, logoutService) {
        var model =this;

        function init() {
            model.currentUser = currentUser;
            model.logout = logoutService.logout;
        }
        init();
    }
})();