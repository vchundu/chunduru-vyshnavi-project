(function() {
    angular
        .module('VSpotify')
        .factory('userService', userService);

    function userService($http) {

        return {
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            register: register,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout
        };

        function findUserByUsername(username) {
            var url = "/api/project/username/user?username="+username;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });

        }

        function findUserById(userId) {

            var url = "/api/project/user/"+userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
            // for (var u in users) {
            //     if (users[u]._id === id) {
            //         return users[u];
            //     }
            // }
            // return null;
        }

        function register(user) {
            user.roles = ["USER"];
            user._following = [];
            // user.playlists = [];
            // users.push(user);
            // return user;
            var url = "/api/project/register";
            return $http.post(url, user)
                .then(function(response) {
                    return response.data;
                });
        }

        // function login(username, password) {
        //     var url= "/api/project/credentials/user?username="+username+"&password="+password;
        //     console.log('in client service');
        //     return $http.get(url)
        //         .then(function(response) {
        //             return response.data;
        //         });
        // }

        function login(username, password) {
            var url= "/api/project/login";
            return $http.post(url, {"username":username, "password":password})
                .then(function(response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post('url')
                .then(function(response) {
                    return response.data;
                });
        }





    }
})();