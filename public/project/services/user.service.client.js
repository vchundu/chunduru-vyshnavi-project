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
            logout: logout,
            followUser: followUser,
            unfollowUser : unfollowUser,
            followPlaylist: followPlaylist,
            unfollowPlaylist: unfollowPlaylist,
            updateUser: updateUser,
            findPlaylistsUserFollows: findPlaylistsUserFollows,
            findFollowers: findFollowers,
            findFollowing: findFollowing
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
        }

        function register(user) {
            user.roles = ["USER"];
            user._following = [];
            var url = "/api/project/register";
            return $http.post(url, user)
                .then(function(response) {
                    return response.data;
                });
        }


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

        function followUser(currentUserId, wantsToFollowId) {
            var url = "/api/project/user/follow";
            var ids = {
                "currentUserId" :currentUserId,
                "wantsToFollowId" : wantsToFollowId
            };
            return $http.put(url, ids)
                .then(function(response) {
                    return response.data;
                });
        }

        function unfollowUser(currentUserId, wantsToUnfollowId) {
            var url = "/api/project/user/unfollow";
            var ids = {
                "currentUserId" :currentUserId,
                "wantsToUnfollowId" : wantsToUnfollowId
            };
            return $http.put(url, ids)
                .then(function(response) {
                    return response.data;
                });
        }

        function followPlaylist(userId, playlistId) {
            var url = "/api/project/user/playlist/follow";
            var ids = {
                "userId":userId,
                "playlistId":playlistId
            };

            return $http.put(url, ids)
                .then(function(response) {
                    return response.data;
                });
        }

        function unfollowPlaylist(userId, playlistId) {
            var url = "/api/project/user/playlist/unfollow";
            var ids = {
                "userId":userId,
                "playlistId":playlistId
            };
            return $http.put(url, ids)
                .then(function(response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url ="/api/project/user/"+userId;
            return $http.put(url, user)
                .then(function(response) {
                    return response.data;
                });
        }

        function findPlaylistsUserFollows(userId) {
            var url ="/api/project/user/playlists/follow/"+userId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function findFollowers(userId) {
            var url = "/api/project/user/"+userId+"/followers";
            return $http.get(url)
                .then(function(response) {
                    console.log(response.data);
                    return response.data;
                })
        }

        function findFollowing(userId) {
            var url = "/api/project/user/"+userId+"/following";
            return $http.get(url)
                .then(function(response) {
                    console.log(response.data);
                    return response.data;
                })
        }
    }
})();