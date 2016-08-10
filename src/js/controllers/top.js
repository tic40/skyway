"use strict";

angular.module('SkywayRoom.controllers.top', []).
    controller('topController', [
    '$scope', '$window', '$location', '$timeout', 'baseConstants', 'userService',
    function($scope, $window, $location, $timeout, baseConstants, userService) {

    // init
    $scope.init = function() {
        $scope.params = {
            name : '',
        };
        $scope.showLoading = false;
        $scope.loginError = false;
    };

    $scope.enter = function() {

        // validate
        if (!$scope.params['name']) {
            $scope.loginError = true;
            return;
        }

        showLoading(function() {
            $timeout(function() {
                if (userService.login($scope.params) == true) {
                    hideLoading();
                    // TODO:
                    $location.path('/skyway/room');
                } else {
                    hideLoading();
                    $scope.loginError = true;
                    // TODO:
                }
            }, 1000);
        });
    };

    var showLoading = function(callback) {
        $scope.showLoading = true;
        if (typeof callback == "function") { callback(); }
    };

    var hideLoading = function(callback) {
        $scope.showLoading = false;
        if (typeof callback == "function") { callback(); }
    };

    var getOSName = function() {
        var userAgent = $window.navigator.userAgent;
        var operationSystems = {
            "Windows": /Win/,
            "Android": /Android/,
            "OpenBSD": /OpenBSD/,
            "SunOS": /SunOS/,
            "Linux": /(Linux|X11)/,
            "iOS": /(iPhone|iPad|iPod)/,
            "MacOS": /Mac/,
            "QNX": /QNX/,
            "UNIX": /UNIX/,
            "BeOS": /BeOS/,
            "OS/2": /OS\/2/,
            "SearchBot": /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
        };
        for (var key in operationSystems) {
            if (operationSystems[key].test(userAgent)) return key;
        }
        return 'unknown';
    };

    $scope.init();
}]);
