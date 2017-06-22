(function() {
    angular
        .module('VSpotify')
        .controller('loginController', loginController);

    function loginController(userService, $location) {
        var model = this;


        model.login = login;

        function login(username, password) {
            userService
                .login(username, password)
                .then(function(user) {
                    $location.url('/profile');
                }, function(error) {
                    model.message = "Sorry, that username and password combo don't work";
                })
        }
    }
})();