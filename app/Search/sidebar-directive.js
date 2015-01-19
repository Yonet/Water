'use strict';

/**
 * @ngdoc directive
 * @name app.directive:sideBar
 * @description Created the side bar using the search data. Creates sub menus using filters and children attributes of the data.
 * # sideBar
 */
angular.module('app')
	.directive('sidebar', [function() {
		var postLink = function(scope, element, attrs) {

			// scope.selected = scope.parent.searchTerms.selected;

		};///postLink

		return {
			restrict: 'EA',
			templateUrl: 'Search/sidebar-template.html',
			link: postLink
		};

	}]);