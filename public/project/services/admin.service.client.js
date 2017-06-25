(function() {
    angular
        .module('VSpotify')
        .factory('adminService', adminService);

    function adminService($http) {

        return {
            findAllPlaylists : findAllPlaylists,
            findAllUsers : findAllUsers,
            deleteUser : deleteUser,
            findUserById : findUserById,
            updateUser : updateUser,
            createUser : createUser
        };

        function findAllPlaylists() {
            var url = "/api/project/admin/playlists";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/project/admin/users";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function deleteUser(user) {
            var url = "/api/project/admin/user/"+user._id;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/project/admin/user/"+userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateUser(user) {
            var url = "/api/project/admin/user/"+user._id;
            return $http.put(url, user)
                .then(function(response){
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/admin/user";
            return $http.post(url, user)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();