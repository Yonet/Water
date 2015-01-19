
'use strict';
/*global _*/

/**
 * @ngdoc function
 * @name app.controller:DashboardController
 * @description
 * # app.DashboardController
 * Controller of the app
 */
angular.module('app.dashboard')
  .controller('DashboardController', ['$scope', '$rootScope', 'searchDataService', function ($scope, $rootScope, searchDataService) {
  		
  		//For debugging purposes
  		$scope.name = 'DashboardController';

  		$scope.selectedFilters =  searchDataService.getSelected('filters') ;
  		console.log('$scope.selectedFilters ', $scope.selectedFilters)

// ===========move to a service to reuse in sidebar
		$scope.groupedBy = searchDataService.getSelected('group');
		console.log('$scope.groupedBy ', $scope.groupedBy)
		$scope.allFilters = searchDataService.getAllFilters();

		$scope.allGroups = searchDataService.terms;
		/**
		 * Selects Filter
		 * @param  {obj} filter
		 */
		$scope.selectFilter = function (item, type) {
			searchDataService.setSelected(item, type);
			if(type === 'group') { $scope.groupedBy = item; }
			$rootScope.$emit('filters:change');
		};

		$scope.filterRemoved = function (item) {
			// console.log('removed', item);
			$rootScope.$emit('filters:change');
		};

		$scope.selectSubView = function(subview) {
			$scope.selectItem(subview);
			$scope.subviewSelected = subview;
		}

		/**
		 * Selects the sidebar buttons and change the dashboard view
		 * @param  {obj} selectedItem selected category item
		 */
		$scope.selectItem = function(selectedItem) {
			$scope.selected = selectedItem;
			$rootScope.$emit('grouping:change');
			searchDataService.setSelected(selectedItem);
			searchDataService.selectItem(selectedItem);

		};
//=========/move to a service to reuse in sidebar

		$scope.selected = searchDataService.getSelected();
		$scope.selectedFilters = $rootScope.filters;

		// console.log('rootScope filers on dashboard', $scope.selectedFilters)
		
		/**
		 * Wathes for category selection on the rootscope
		 */
		$rootScope.$on('grouping:change', function() {
			$scope.groupedBy = searchDataService.getSelected();
			console.log('$scope.grouped by in dashboard wather', $scope.groupedBy)
		});

		/**
		 * Wathes for filter selection on the rootscope
		 */
		$rootScope.$on('filters:change', function() {
			$scope.selectedFilters =  $rootScope.selectedFilters;

			console.log('$scope.selected in dashboard', $scope.selectedFilters);
		});

	}]);