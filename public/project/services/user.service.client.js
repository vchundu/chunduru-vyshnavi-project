(function() {
    angular
        .module('VSpotify')
        .factory('userService', userService);

    function userService($http) {

        var users = [
            {"username": "k", "password": "k", "roles": ["USER"], "following": [], "_id": "123"}
        ];

        return {
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            register: register,
            login: login
        };

        function findUserByUsername(username) {
            for (var u in users) {
                if (users[u].username === username) {
                    return users[u];
                }
            }
            return null;
            // var url = "/api/project/username/user";
            // return $http.get(url)
            //     .then(function(response) {
            //         return response.data;
            //     });
        }

        function findUserById(id) {
            for (var u in users) {
                if (users[u]._id === id) {
                    return users[u];
                }
            }
            return null;
        }

        function register(user) {
            user.roles = ["USER"];
            user._following = [];
            user.playlists = [];
            user._id = new Date().getTime() + "";
            users.push(user);
            return user;
            // var url = "/api/project/register";
            // return $http.post(url, user)
            //     .then(function(response) {
            //         return response.data;
            //     });
        }

        function login(username, password) {
            for (var u in users) {
                if(users[u].username === username && users[u].password === password) {
                    return users[u];
                }
            }
            return null;
        }



    }
})();