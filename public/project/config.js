(function() {
    angular
        .module('VSpotify')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl:'views/home/home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/playlist/:playlistId', {
                templateUrl: 'views/playlist/templates/playlist-specific.view.client.html',
                controller: 'playlistController',
                controllerAs: 'model'
            })
            .when('/user/:userId/album/:albumId', {
                templateUrl: 'views/album/templates/album.view.client.html',
                controller: 'albumController',
                controllerAs: 'model'
            });
    }
})();