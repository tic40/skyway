"use strict";

angular.module('SkywayRoom.services.user', []).
    service('userService', [
    'baseConstants', 'skywayService',
    function(baseConstants, skywayService) {

    var _isLogin;
    var _userName;
    var _peer;
    var _peerId;
    var _calleePeerId;

    var init = function() {
        _isLogin = false;
        _userName = null;
        _peer = null;
        _peerId = null;
        _calleePeerId = null;
    };

    var setup = function(params) {
        skywayService.init();
        _userName = params.name;
        _peerId = params.name;
        skywayService.createPeer(_userName);
        _isLogin = true;
    };

    init();

    return {
        getUserName: function() { return _userName; },
        getPeerId: function() { return _peerId; },
        getCalleePeerId: function() {return _calleePeerId; },

        init: function() {
            init();
        },

        login: function(params) {
            console.log('login');
            setup(params);
            return true;
        },

        logout: function() {
            console.log('logout');
            init();
            return true;
        },
    };

}]);
