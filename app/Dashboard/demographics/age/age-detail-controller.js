'use strict';
/*global _*/
/*global d3*/

/**
 * @ngdoc function
 * @name app.dashboard.controller:AgeDetailController
 * @description
 * # AgeDetailController
 * Controller of the app
 */
angular.module('app.dashboard')
	.controller('AgeDetailController', ['$scope', 'demographicsDataService', '$mdBottomSheet', function ($scope, demographicsDataService, $mdBottomSheet) {

		$scope.controllerName = 'AgeDetailController';
		var data = demographicsDataService.detailDataAge;
		// console.log('AgeDetailController')
		$scope.data = data.data[0];
		var related = [];
		angular.forEach(data.meta.related, function(value) {
			var dataName = value + 'Data';
			var total = 0;
			angular.forEach(demographicsDataService[dataName], function(value) {
				total += value.count;
			});
			related.push({
				name: value,
				data:  demographicsDataService[dataName],
				total: total
			});
		});
		$scope.related = related;
		$scope.filters = data.data[0].filters;

		$scope.normalize=true;//

		var createRandomValues = function() {
			angular.forEach(related, function(value) {
				angular.forEach(value.data, function(val) {
					val.count = _.random(val.count);
				});
			});
			angular.forEach($scope.data.data, function(val) {
				val.count = _.random(val.count) ;
			});
			$scope.related = related;
		};
		$scope.$watch('filters.selected', function(newVal, oldVal){
			if(newVal !== oldVal) { createRandomValues(); }
		});

		$scope.$watch('normalize', function(newVal, oldVal) {
			if(!$scope.$$phase) { $scope.$apply(); }
		})
		

	}]);