'use strict';

/**
 * @ngdoc directive
 * @name app.directive:multiRingGraph
 * @description
 * # multiRingGraph
 */
angular.module('app')
	.directive('multiRingGraph', [function () {
		var width = 960;
		var height = 500;
		var radius = Math.min(width, height) /1.9;
		var spacing = 0.09; 
		var postLink = function (scope, element, attrs) {
			var arc = d3.svg.arc()
				.startAngle(180)
				.endAngle(function(d){ return d.value * 2 * Math.PI; })
				.innerRadius(function(d, i) { return i * radius; })
				.outerRadius( function(d,i) { return (i + spacing) * radius; })

			var svg = d3.select(el[0])

				
		};
		return {
			restrict: 'E',
			link: postLink
		};
	}]);
