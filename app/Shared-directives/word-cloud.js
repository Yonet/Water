'use strict';
/* global d3 */

/**
 * @ngdoc directive
 * @name app.dashboard.directive:wordCloud
 * @description
 * # wordCloud
 */
angular.module('app.dashboard')
	.directive('wordCloud', [function() {
		var colors = ["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]; //Grey scale
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			link: function postLink(scope, element, attrs) {
				// element.text('this is the wordCloud directive');
				var data = scope.data;
					
					
				
			}
		};
	}]);
