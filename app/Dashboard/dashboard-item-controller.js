'use strict';


/**
 * @ngdoc function
 * @name app.controller:DashboardItemController
 * @description
 * # DashboardItemController
 * Controller of the app
 */
angular.module('app.dashboard')
	.controller('DashboardItemController', ['$scope', '$stateParams', 'demographicsDataService', 'partitionDataService', function ($scope, $stateParams, demographicsDataService, partitionDataService) {
		$scope.name = 'DashboardItemController';
		$scope.demographicsData = demographicsDataService.data.data;

		$scope.normalize = true;//

		$scope.rangeSlider = 100;

		$scope.category = $stateParams.item;

		$scope.BrandsData = [{}, {}, {}];
		$scope.physicalData = partitionDataService.data;

		$scope.$watch('filters.selected', function(newVal, oldVal){
			if(newVal !== oldVal) { createRandomValues(); }
		});

		$scope.$watch('normalize', function(newVal, oldVal) {
			if(!$scope.$$phase) { $scope.$apply(); }
		})
		

	}]);