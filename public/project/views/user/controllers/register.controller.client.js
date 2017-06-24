(function() {
    angular
        .module('VSpotify')
        .controller('registerController', registerController);

    function registerController(userService, $location) {

        var model = this;

        model.register = register;

        function register(username, password, verifyPassword) {
            model.message = "";

            if (password === verifyPassword) {
                userService
                    .findUserByUsername(username)
                    .then(userFound, userNotFound);
            } else {
                model.message = "These passwords do not match";
            }

            function userFound(user) {
                model.message = "The username " + username + " is already taken";
            }

            function userNotFound(error) {
                var user = {
                    username: username,
                    password: password
                };

                userService
                    .register(user)
                    .then(function(user) {
                        $location.url('/profile');
                    });
            }
        }
    }
})();