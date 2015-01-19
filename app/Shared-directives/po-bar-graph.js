'use strict';
/*global d3*/

/**
 * @ngdoc directive
 * @name app.dashboard.directive:poBarGraph
 * @description
 * # poBarGraph
 */
angular.module('app.dashboard')
	.directive('poBarGraph', [function() {



		//Linking Function
		var postLink = function(scope, element, attrs) {
			var margin = {top: 100, right: 100, bottom: 20, left: 100};

			var parentWidth = element[0].parentElement.clientWidth ;
			var parentHeight = element[0].clientHeight - 20;
			var width = +attrs.width || parentWidth || 400;
			width -= margin.right + margin.left;
			var height = +attrs.height || parentHeight || 400;
			height -= margin.top + margin.bottom;
			var data = scope.data;
			var normalize = scope.normalize;
			var format = d3.format('f');

			var color = d3.scale.linear()
				.range(['#de9ed6', '#7b4173'])

			var x = d3.scale.linear()
				.range([0, width]);
			var y = d3.scale.linear()
				.range([0, height]);
			var normalized = d3.scale.linear()
				.range([0, 100]);
			// var normalizedX = d3.scale.linear()
			// 	.range([0, width]);
			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

			var drawBarChart = function(data){

				var container = d3.select(element[0]);
				var maxValue = 0;
				var totalVal = 0;
				var length = data.length;
				var barHeight = 20;

				//If sorted attribute exists sorts the data. 
				if(attrs.sorted) { 
					data.sort(function(a, b) {
						return b.count - a.count;
					});
				}

				//If limitTo attribute exists limits the number of data points.
				if(attrs.limitto) {
					var limit = parseInt(attrs.limitto);
					data = data.slice(0, limit);
				}

				angular.forEach(data, function(value) {
					totalVal += value.count;
					maxValue = maxValue > value.count ? maxValue : value.count;
				});

				if(!data) { return; }
				var dataLen = data.length > 6 ? 5 : data.length;
				color.domain([0, maxValue]);

				if(scope.normalize) { 
					x.domain([0, totalVal]);
				}
				else {
					x.domain([0, maxValue]);
				}
				normalized.domain([0, totalVal]);
				y.domain([0, length]);
				

				var svg = container.append('svg')
					.attr('width', width + margin.left + margin.right);
				var group = svg.selectAll('g')
						.data(data)
					.enter().append('g');
				
				var bar = group.append('rect')
					.attr({
						width: 0,
						opacity: 0,
						height: barHeight + 'px',
						fill: function(d){return color(d.count);},
						stroke: 'white',
						y: function(d, i) { return i * barHeight + 2 + 50; }
					});

				bar.transition()
					.duration(1000)
					.attr('width', function(d){ return x(d.count); })
					.attr('opacity', '1');

				// svg.append("g")
				// 	.attr("class", "x axis")
				// 	.attr("transform", "translate(0," + (parseInt((barHeight+2) * dataLen) + 50) + ")")
				// 	.call(xAxis);

				group.append('text')
					.attr('x', function(d) { return x(d.count) + 3; })
					.attr('y', function(d, i) { return (i * barHeight) + barHeight / 2 + 50; })
					.attr('dy', '.35em')
					.attr('opacity', 0)
					.text(function(d) {
						return scope.normalize ? format(normalized(d.count)) + '%' + d.name : d.count + ' ' + d.name; 
					})
					.transition()
					.delay(1000)
					.attr('opacity', 1);
			};
				
			//Don't try to draw before data loads. 
			if(data) { drawBarChart(data); }
		
			//Watch for data and rerender the graph
			scope.$watch('data', function(newVal, oldVal){

				//Don't draw if the data hasn't changed. 
				if (newVal === oldVal) { return; }
				element.empty();
				drawBarChart(data);
			}, true);///watch

		};///PostLink

		//Returned directive object
		return {
			restrict: 'EA',
			scope: {
				data: '=',//two way binding
				sorted: '&',
				limitTo: '@',
				width: '@',
				height: '@', 
				normalize: '='
			},
			link: postLink
		};

	}]);
