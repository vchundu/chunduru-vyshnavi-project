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
            createUser : createUser,
            findPlaylistById : findPlaylistById,
            updatePlaylist: updatePlaylist,
            createPlaylist: createPlaylist,
            deletePlaylist: deletePlaylist
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

        function findPlaylistById(playlistId) {
            var url = "/api/project/admin/playlist/"+playlistId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function updatePlaylist(playlistId, playlist) {
            var url = "/api/project/admin/playlist/"+playlistId;
            return $http.put(url, playlist)
                .then(function(response) {
                    return response.data;
                })
        }

        function createPlaylist(playlist) {
            var url = "/api/project/admin/playlist";
            return $http.post(url, playlist)
                .then(function(response) {
                    return response.data;
                })
        }

        function deletePlaylist(playlistId) {
            var url = "/api/project/admin/playlist/"+playlistId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();