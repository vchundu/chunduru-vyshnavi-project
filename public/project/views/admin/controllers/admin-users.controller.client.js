(function() {
    angular
        .module('VSpotify')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(currentUser, adminService, logoutService) {
        var model = this;

        function init() {
            model.logout = logoutService.logout;
            model.currentUser = currentUser;

            adminService
                .findAllUsers()
                .then(function(users) {
                    model.users = users;
                });

            model.deleteUser = deleteUser;
        }
        init();
        function deleteUser(user) {
            if (confirm("Are you sure you want to delete " + user.username + "'s account?")) {
                adminService
                    .deleteUser(user)
                    .then(function(response) {
                       var index = model.users.indexOf(user);
                       model.users.splice(index, 1);
                    });
            }

        }
    }
})();