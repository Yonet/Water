// 'use strict';

// /**
//  * @ngdoc directive
//  * @name app.directive:searchSelectDropdown
//  * @description
//  * # searchSelectDropdown
//  */
// angular.module('app')
// 	.directive('searchSelectDropdown', ['searchDataService', function (searchDataService) {
// 		var postLink = function (scope, element, attrs) {
// 				// element.text('this is the searchSelectDropdown directive');
// 				scope.routes = searchDataService.data;
// 				//Should fill the data from the search data service.
// 			};

// 		return {
// 			template: '<select ng-model="routes.children.selected" ng-options="route.name for route in routes.children"></select>',
// 			restrict: 'E',
// 			link: postLink
// 		};
		
// 	}]);
