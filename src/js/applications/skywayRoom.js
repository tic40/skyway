"use strict";

angular.module('SkywayRoom', [
    'ngRoute',
    'SkywayRoom.constants.base',
    'SkywayRoom.services.api',
    'SkywayRoom.services.user',
    'SkywayRoom.services.skyway',
    'SkywayRoom.controllers.top',
    'SkywayRoom.controllers.room',
]).
config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {

    var ROOT = '/skyway/';

    $routeProvider
        .when(ROOT, {
            templateUrl: ROOT + 'src/views/top.html',
            controller: 'topController'
        })
        .when(ROOT + 'room/', {
            templateUrl: ROOT + 'src/views/room.html',
            controller: 'roomController'
        })
        .when(ROOT + 'room/:peerID', {
            templateUrl: ROOT + 'src/views/room.html',
            controller: 'roomController'
        })
        .otherwise({
            redirectTo: ROOT
        });

    $locationProvider.html5Mode (
    {
        enabled: true,
        requireBase: false
    });

}]);
