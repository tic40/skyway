"use strict";

angular.module('SkywayRoom.controllers.room', []).
    controller('roomController', [
    '$scope', '$location', '$timeout', 'baseConstants', 'userService', 'skywayService',
    function($scope, $location, $timeout, baseConstants, userService, skywayService) {

    $scope.isOpenChat = false;
    $scope.peerId = userService.getPeerId();
    $scope.destPeerId = null;
    $scope.disabledConnectBtn = false;

    $scope.logout = function() {
        if (confirm("ログアウトします") == true) {
            userService.logout();
            $location.path('/');
        }
    };

    $scope.chatButton = function() {
        $scope.isOpenChat = !$scope.isOpenChat;
    };

    $scope.connect = function() {
        $scope.disabledConnectBtn = true;
        skywayService.call($scope.destPeerId);
         $timeout(function() {
            $scope.disabledConnectBtn = false;
        }, 5000);
    };

    skywayService.getLocalStream(function() {
        skywayService.receiveCall();
        var calleePeerId = userService.getCalleePeerId();
    });
}]);
