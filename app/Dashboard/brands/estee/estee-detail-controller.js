'use strict';


/**
 * @ngdoc function
 * @name app.dashboard.controller:EsteeDetailController
 * @description
 * # EsteeDetailController
 * Controller of the app
 */
angular.module('app.dashboard')
	.controller('EsteeDetailController', ['$scope', 'demographicsDataService', function ($scope, demographicsDataService) {
		$scope.controller = 'EsteeDetailController';
		$scope.filters = [{name: 'Age'}, {name: 'Skin Type'}];
		$scope.filters.selected;
		
		$scope.name = 'Estee Lauder';
		$scope.view = 'Age';
		

		var data = demographicsDataService.detailDataAge;
		// // console.log('AgeDetailController')
		$scope.data = data.data[0];
		// console.log('$scope.data',$scope.data)
		// $scope.related = data.meta.related;
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

		// $scope.related = related;
		// $scope.filters = data.data[0].filters;

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
			console.log('view', newVal)
			if(newVal !== oldVal) { $scope.view = newVal.name; }
		});


		// clinique users by skin type

		var skinData = [{"group":"It's dry.","dimensions":[{"name":"Yes, and I've used Clinique products","count":182},{"name":"Yes, but I have not used Clinique products","count":60},{"name":"No, I've never heard of Clinique","count":6}]},{"group":"It's oily.","dimensions":[{"name":"Yes, and I've used Clinique products","count":224},{"name":"Yes, but I have not used Clinique products","count":89},{"name":"No, I've never heard of Clinique","count":9}]},{"group":"It's normal.","dimensions":[{"name":"Yes, and I've used Clinique products","count":288},{"name":"Yes, but I have not used Clinique products","count":78},{"name":"No, I've never heard of Clinique","count":11}]},{"group":"It depends.","dimensions":[{"name":"Yes, and I've used Clinique products","count":300},{"name":"Yes, but I have not used Clinique products","count":93},{"name":"No, I've never heard of Clinique","count":2}]}]

		var ageData = [{"group":"Under 18","dimensions":[{"name":"Yes, and I've used Clinique products","count":151},{"name":"Yes, but I have not used Clinique products","count":206},{"name":"No, I've never heard of Clinique","count":9}]},{"group":"18-24","dimensions":[{"name":"Yes, and I've used Clinique products","count":319},{"name":"Yes, but I have not used Clinique products","count":142},{"name":"No, I've never heard of Clinique","count":16}]},{"group":"25-34","dimensions":[{"name":"Yes, and I've used Clinique products","count":353},{"name":"Yes, but I have not used Clinique products","count":109},{"name":"No, I've never heard of Clinique","count":14}]},{"group":"35-50","dimensions":[{"name":"Yes, and I've used Clinique products","count":315},{"name":"Yes, but I have not used Clinique products","count":57},{"name":"No, I've never heard of Clinique","count":6}]},{"group":"50+","dimensions":[{"name":"Yes, and I've used Clinique products","count":188},{"name":"Yes, but I have not used Clinique products","count":64},{"name":"No, I've never heard of Clinique","count":6}]}];


			// if($scope.filters.selected && $scope.filters.selected.name === 'Skin Type') { $scope.data = skinData;} 
			// $scope.data = ageData;
			var ageGraphData = [],
				ageGroups = [];
			angular.forEach(ageData, function(val){
				ageGraphData.push(val.dimensions);
				ageGroups.push(val.group);
			})

			var skinGraphData = [],
				skinGroups = [];
			angular.forEach(skinData, function(val){
				skinGraphData.push(val.dimensions);
				skinGroups.push(val.group);
			})

			// console.log('skinGraphData',skinGraphData)
		// $scope.skinData = ageGraphData;
		$scope.ageGroups = ageGroups;
		$scope.ageData = ageGraphData;

		$scope.skinGroups = skinGroups;
		$scope.skinData = skinGraphData;
		

	}]);

