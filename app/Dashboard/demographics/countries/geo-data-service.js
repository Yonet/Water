'use strict';
/*global d3*/

/**
 * @ngdoc function
 * @name app.service.geoDataService
 * @description
 * # geoDataService
 * Service of the app.dashboard
 */

angular.module('app.service.geoDataService', [])
	.factory('geoDataService', ['$http', function($http) {
		var promise = null;
		// var scripts = document.getElementsByTagName("script")	
		// var currentScriptPath = scripts[scripts.length-1].src;

		return function(path) {
			if (promise) {
				// If we've already asked for this data once,
				// return the promise that already exists.
				return promise;
			} else {
				promise = $http.get(path);
				return promise;
			}
		};
	}]);