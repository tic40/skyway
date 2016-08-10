"use strict";

angular.module('SkywayRoom.services.api', []).
    service('apiService', [
    '$http', '$q',
    function($http, $q) {

    var _errCode = {
        // TODO
    };

    var _resultFlg = {
        SUCCESS: "1",
        FAILURE: "1",
    };

    var _baseURL = '';

    return {
        errCode: _errCode,
        resultFlg: _resultFlg,

        memberLogin: function() {
            // TODO
            var ulr = _baseURL;
            var deferred = $q.defer();
            var params = {
                /*
                request: JSON.stringify({

                });
                */
            };
            $http.post(url, params).
                success(function(data) {
                deferred.resolve(data);
            }).
            error(function() {
                deferred.reject();
            });
            return deferred.promise;
        },
    };
}]);
