(function() {
    angular
        .module('VSpotify')
        .controller('adminUserEditController', adminUserEditController);

    function adminUserEditController(currentUser, $routeParams, adminService, $location) {
        var userId = $routeParams['userId'];

        var model = this;
        adminService
            .findAllUsers()
            .then(function(users) {
                model.users = users;
            });

        if (userId === "new") {
            model.isNew = true;
            model.title = "Create User";
            model.isAdmin = false;
        } else {
            model.isNew = false;
            adminService
                .findUserById(userId)
                .then(function(user) {
                    model.user = angular.copy(user);
                    model.title = "Edit User";
                    model.isAdmin = user.roles.indexOf('ADMIN') > -1;
                });
        }

        model.updateUser = updateUser;
        model.createUser = createUser;

        function updateUser(user) {
            checkAdmin(user);
            adminService
                .updateUser(user)
                .then(function(response) {
                    $location.url('/admin/users');
                });
        }

        function createUser(user) {
            user.roles= ["USER"];
            if (model.isAdmin) {
                user.roles.push('ADMIN');
            }
            adminService
                .createUser(user)
                .then(function(response) {
                    $location.url('/admin/users');
                });
        }

        function checkAdmin(user) {
            if (model.isAdmin && (user.roles.indexOf('ADMIN') === -1)) {
                user.roles.push('ADMIN');
            } else if (!model.isAdmin && (user.roles.indexOf('ADMIN') >-1)) {
                var index = user.roles.indexOf('ADMIN');
                user.roles.splice(index, 1);
            }
            return user;
        }




    }
})();