(function() {
    angular
        .module("VSpotify")
        .service('navigationService', navigationService);

    function navigationService($location) {
        var service = this;
        service.backLocation = "/";
        service.forwardLocation = "/";

        this.pressBack = pressBack;
        this.pressForward = pressForward;

        function pressBack(location) {
            var temp = service.backLocation;
            service.forwardLocation = location;
            $location.url(temp);
        }

        function pressForward(location) {
            var temp = service.forwardLocation;
            // service.
        }
    }

})();