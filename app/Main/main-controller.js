'use strict';
/*global _*/

/**
 * @ngdoc function
 * @name app.controller:MainController
 * @description
 * # MainController
 * Controller of the app
 */
angular.module('app')
  .controller('MainController', ['$scope', '$rootScope', '$stateParams', 'Restangular', 'partitionDataService',  'searchDataService', function ($scope, $rootScope, $stateParams, Restangular, partitionDataService, searchDataService) {

		//Debugging purposes
		$scope.controller = 'MainController';

  		//Search terms to fill out dropdown selection.
  		$scope.searchTerms = searchDataService.terms;

		//Bubble graph data
		$scope.bundles = searchDataService.data;

		//Sets the title
		$scope.title = $scope.selectedTerm && $scope.selectedTerm.name;

  		//Navigation click function
		$scope.onClick = function(term) {
			$scope.selectedTerm = term;
			// searchDataService.setSelected(term, 'group');
			searchDataService.selectItem(term);

			//!$scope.$$phase checks if the digest is in process
			// if(!$scope.$$phase) { $scope.$apply(); }//Used to invoke digest cycle because d3 click event is not triggering digest in angular.
			$scope.title = term.name;
		};

		var searchData = searchDataService.data;

		var categories = [];

		angular.forEach(searchData.children, function(value) {
			categories.push({name: value.name});
		});

		$scope.categories = categories;

		$rootScope.$on('selection:change', function() {
			$scope.selectedTerm = searchDataService.getSelected();
		});

		/**
		 * Wathes for category selection on the rootscope
		 */
		// $rootScope.$on('grouping:change', function() {
		// 	$scope.selectedTerm = searchDataService.getSelected('group');
		// 	console.log('Category Selection changed on SearchController', $scope.searchTerms.selected );
		// });
	}]);
