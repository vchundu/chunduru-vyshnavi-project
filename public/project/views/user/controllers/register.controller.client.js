(function() {
    angular
        .module('VSpotify')
        .controller('registerController', registerController);

    function registerController(userService, $location) {

        var model = this;

        model.register = register;

        function register(username, password, verifyPassword) {
            model.message = "";
            console.log('in register');

            if (password === verifyPassword) {
                console.log('passwords match');
                var user = userService.findUserByUsername(username);
                if (user !== null) {
                    console.log('user has been found');
                    model.message = "The username " + username + " is already taken";
                } else {
                    console.log('creating new user');
                    var newUser = {
                        username: username,
                        password: password
                    };

                    newUser = userService.register(newUser);
                    $location.url('/profile/'+newUser._id);
                }
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