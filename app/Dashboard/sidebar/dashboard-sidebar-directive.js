'use strict';


/**
 * @ngdoc directive
 * @name app.dashboard.directive:poDashboardSidebar
 * @description
 * # poDashboardSidebar
 */
angular.module('app.dashboard')
	.directive('poDashboardSidebar', [function () {
		
		var postLink = function (scope, element) {
			
			element.text('this is the searchSelectDropdown directive');
			
			element.on('active', function(){
				console.log('active element');
			});

		};

		return {
			restrict: 'EA',
			link: postLink
		}

	}]);