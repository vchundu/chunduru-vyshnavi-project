(function() {
    angular
        .module('VSpotify')
        .controller('loginController', loginController);

    function loginController() {
        var model = this;

        model.login = login;
        function login(username, password) {

        }
    }
})();