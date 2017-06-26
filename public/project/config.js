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
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser : checkLoggedIn
                }
            })
            .when('/profile/:username', {
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'profileEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:username', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'otherUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/playlist/:playlistId', {
                templateUrl: 'views/playlist/templates/playlist-specific.view.client.html',
                controller: 'playlistController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAnonymous
                }
            })
            .when('/playlist/edit/:playlistId', {
                templateUrl: 'views/playlist/templates/playlist-edit.view.client.html',
                controller: 'playlistEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/album/:albumTitle/:albumArtist', {
                templateUrl: 'views/album/templates/album.view.client.html',
                controller: 'albumController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAnonymous
                }
            })
            .when('/artist/:artistName', {
                templateUrl: 'views/artist/templates/artist.view.client.html',
                controller: 'artistController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAnonymous
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/users', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user/:userId', {
                templateUrl: 'views/admin/templates/admin-user-edit.view.client.html',
                controller: 'adminUserEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/playlists', {
                templateUrl: 'views/admin/templates/admin-playlists.view.client.html',
                controller: 'adminPlaylistsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/playlist/:playlistId', {
                templateUrl: 'views/admin/templates/admin-playlist-edit.view.client.html',
                controller: 'adminPlaylistEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAnonymous
                }
            })
            .when('/create', {
                templateUrl: 'views/playlist/templates/create-playlist.view.client.html',
                controller: 'createPlaylistController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAnonymous
                }
            })
            .when('/suggestion', {
                templateUrl: 'views/suggestion/templates/create-suggestion.view.client.html',
                controller: 'createSuggestionController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/playlist/:playlistId/suggestions', {
                templateUrl: 'views/suggestion/templates/suggestion-list.view.client.html',
                controller: 'suggestionListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(currentUser) {
                if(currentUser === '0' || currentUser.roles.indexOf('ADMIN') === -1) {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkAnonymous($q, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(currentUser) {
                deferred.resolve(currentUser);
            });
        return deferred.promise;
    }

})();