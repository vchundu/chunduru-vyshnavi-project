(function() {
    angular
        .module('VSpotify')
        .factory("logoutService", logoutService);

    function logoutService($http, $location) {

        return {
            logout: logout
        };

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function(response) {
                    $location.url('/');
                });
        }
    }
})();