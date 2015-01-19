'use strict';

/**
 * @ngdoc service
 * @name app.httpInterceptor
 * @description
 * # httpInterceptor
 * Factory in the app.
 */
angular.module('app')
	.factory('httpInterceptor', ['$q', '$window', '$location', function ($q, $window, $location) {


		// Public API here
		return function (promise) {
			var success = function (response) {
				return response;
			};

			var error = function (response) {
				if (response.status === 401) {
					$location.url('/login');
				}

				return $q.reject(response);
			};

			return promise.then(success, error);
		};
		
	}]);
