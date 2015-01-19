'use strict';
/*global d3*/

/**
 * @ngdoc directive
 * @name app.directive:introPie
 * @description
 * # introPie
 */
angular.module('app')
	.directive('introPie', [function() {
		var width = 300;
		var height = 300;
		var cwidth = 25;
		
		

		var radius = Math.min(width, height) / 2;
		var degree = Math.PI/180; // just to convert the radian-numbers

		var halfMultiplier = function(val) { 
			if(val === 'left') { return -0.5; }
			if(val === 'right') { return 0.5; }
			return 1;
		};

		var postLink = function(scope, element, attrs) {

			var halfPieScale = d3.scale.linear()
						.domain([0, 180])
						.range([0, 2* Math.PI]);

			var arc = d3.svg.arc();
			var color = d3.scale.category10();
			var data = scope.data;
			var half = halfMultiplier(attrs.half);
			var pathData = [];
			angular.forEach(d3.values(data), function(val, key){
				pathData.push(val.value);
			});

			var pie = d3.layout.pie()
				.sort(null)
				.startAngle(0)
				.endAngle(2 * Math.PI * half);

			var svg = d3.select(element[0]).append('svg')
				.attr('width', width)
				.attr('height', height);
				

			var gs = svg.selectAll('g').data(data).enter().append('g')
				.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

			var path = gs.selectAll('path')
						.data(pie(pathData))
						.enter().append('path')
						.attr({
							'fill': function(d, i) { return color(i); },
							'd':function(d, i, j) { return arc.innerRadius(5+cwidth*j).outerRadius(cwidth*(j+1))(d); }
						})
						.transition()
						.duration(1000);
						// .attr('d', function() {return arc.endAngle(halfPieScale(30)); });


		};///PostLink

		return {
			restrict: 'EA',
			scope: {
				data: '=',
				half: '='
			},
			link: postLink

		};///return directive obj
	}]);
