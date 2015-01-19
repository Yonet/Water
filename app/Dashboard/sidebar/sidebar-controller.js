'use strict';

/**
 * @ngdoc function
 * @name app.dashboard.controller:SideBarController
 * @description
 * # SideBarController
 * Controller of the app
 */
angular.module('app.dashboard')
	.controller('SideBarController',['$scope', '$rootScope', 'searchDataService', function($scope, $rootScope, searchDataService) {

		//For debugging purposes
		$scope.controller = 'sidebar';

		//categories for sidebar buttons
		$scope.categories = searchDataService.data.children;
		$scope.subCategories = {};

		//SearchTerms to save searchTerms.selected on the search input field.
		$scope.searchTerms = searchDataService.terms;
		$scope.selection = {};
		$scope.selection.selectedView = searchDataService.getSelected();
		$scope.subviewSelected = $scope.selection.selectedView && $scope.selection.selectedView.parent && $scope.selection.selectedView;
		
		/**
		 * Selects Filter
		 * @param  {obj} filter
		 */
		$scope.selectFilter = function (item) {

			console.log('selected', item);
			$rootScope.filters.push(item);
			$rootScope.$emit('filters:change');
			console.log('selected filters on root', $rootScope.filters);
		};

		$scope.filterRemoved = function (item) {
			console.log('removed', item);
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
			$rootScope.$emit('category:change');
			searchDataService.setSelected(selectedItem);
			searchDataService.selectItem(selectedItem);

		};

		/**
		 * Wathes for category selection on the rootscope
		 */
		$rootScope.$on('category:change', function() {
			$scope.selected = searchDataService.getSelected();
			console.log('Selection changed on the rootScope', $scope.selected);
		});

		/**
		 * Wathes for filter selection on the rootscope
		 */
		$rootScope.$on('filters:change', function() {
			console.log('filters changed on the rootScope', $rootScope.filters);
		});
}]);