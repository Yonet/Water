'use strict';

/**
 * @ngdoc service
 * @name app.authorization
 * @description
 * # authorization
 * Factory in the app.
 */
angular.module('app')
  .factory('authorization', ['$http', 'config', function ($http, config) {
    // url
    var url ='http://dev.ay.com/api/v1';

    // Public API here
    return {
      login: function (credentials) {
        return $http.post(url + '/questions', credentials);
      }
    };
  }]);
