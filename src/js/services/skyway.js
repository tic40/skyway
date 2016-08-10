"use strict";

angular.module('SkywayRoom.services.skyway', []).
    service('skywayService', [
    'baseConstants',
    function(baseConstants) {

    var _peer;
    var _peerId;
    var _localStream;
    var _existingCall;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var init = function() {
        _peer = null;
        _peerId = null;
        _localStream = null;
        _existingCall = null;
    };

    var getDestStream = function(call) {
        call.on('stream', function(remoteStream) {
            var video = document.getElementById('videoCallee');
            video.src = window.URL.createObjectURL(remoteStream);
        });
    };

    init();

    return {
        getPeerId: function() { return _peerId; },

        createPeer: function(id) {
            var peer = null;
            if (id == 'null') {
                peer = new Peer({key: baseConstants.API_KEY});
            } else {
                peer = new Peer(id, {key: baseConstants.API_KEY});
            }
            _peer = peer;
        },

        getLocalStream: function(callback) {
            navigator.getUserMedia({video: true, audio: true}, function(localStream) {
                var video = document.getElementById('videoCaller');
                video.src = window.URL.createObjectURL(localStream);
                _localStream = localStream;
                callback();
            }, function(err) {
                //
            });
        },

        call: function(destPeerId) {
            var call = _peer.call(destPeerId, _localStream);
            getDestStream(call);
        },

        receiveCall: function() {
            _peer.on('open', function(id) {
                _peerId = id;
                console.log('your peer id: ' + _peerId);
            });
            _peer.on('call', function(call) {
                call.answer(_localStream);
                getDestStream(call);
            });
            _peer.on('error', function(err) {
                alert(err.message);
            });
        },

        endCall: function() {
            // TODO
        },

        getPeer: function() {
            return _peer;
        },

        init: function() {
            init();
        },

    };

}]);
