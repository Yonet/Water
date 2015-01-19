'use strict';

/**
 * @ngdoc service
 * @name app.api
 * @description
 * # api
 * Factory in the app.
 */
angular.module('app')
	.factory('api', ['$http', '$cookies', function ($http, $cookies) {

		// Public API here
		return {
			init: function (token) {
				$http.defaults.headers.common['X-Access-Token'] = token || $cookies.token;
			}
		};
	}]);
