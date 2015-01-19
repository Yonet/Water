'use strict';
/*global _*/
/*global d3*/

/**
 * @ngdoc function
 * @name app.dashboard.controller:MapDetailController
 * @description
 * # MapDetailController
 * Controller of the app
 */
angular.module('app.dashboard')
	.controller('CountriesDetailController', ['$scope', '$rootScope','demographicsDataService', function($scope, $rootScope, demographicsDataService) {

		$scope.data = demographicsDataService.detailDataAge.data[1];

		var countryTotal = {};
		var dsv = d3.dsv("|", "text/plain");
		var max = 0, extent;

		//creates random data for the map


		dsv('Dashboard/demographics/countries/country-code.dsv', function(err, data){
			if (err) console.log('cant read data')
			else 
				angular.forEach(data, function(value){

					var id = value[" country_code "].replace(' ', '').replace('           ', '');
					var count = parseInt(value[" count "], 10);
					max = max > count ? max : count;
					extent = [0, max];
					countryTotal[id] = count;

				});

				$scope.countryTotal = countryTotal;
				$scope.extent = extent;
				$scope.$apply();
		});

		function createRandomData() {

			angular.forEach(countryTotal, function(value, key){
				countryTotal[key] = _.random(value);
			});
			
			$scope.countryTotal = countryTotal;

		};

		$scope.countryClicked = function(ev) {
			console.log('ev', ev);
		}

		//Watch for filter change on rootscope and change the country total...
		$rootScope.$on('filters:change', function() {
			createRandomData();
		});

	}]);
