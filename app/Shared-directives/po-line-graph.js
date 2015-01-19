'use strict';
/*global d3*/

/**
 * @ngdoc directive
 * @name app.dashboard.directive:poLineGraph
 * @description
 * # poLineGraph
 */
angular.module('app.dashboard')
	

	.directive('poLineGraph', [function () {

		var postLink = function (scope, element, attrs) {
			var margin = {top: 10, right: 50, bottom: 50, left: 50};
			var parentWidth = element[0].parentElement.clientWidth;
			var parentHeight = element[0].parentElement.clientHeight - 80;
			var width = parseInt(attrs.width) || parentWidth || 600;
			width -= margin.right + margin.left;
			var height = parseInt(attrs.height) || Math.min(parentHeight, 300) || 300;
			height -= margin.top + margin.bottom;
			console.log('height on line ', height)
			var data = scope.data;


			var yTickFormat = attrs.ytickformat || d3.format('s');
			var yNormalizedFormat = d3.format(".0%");
			var x = d3.scale.ordinal()
				.rangePoints([0, width], 0.5);

			var y = d3.scale.linear()
				.range([height, 0]);
                   // y.domain(d3.extent(data, function(d){ return d.count; }))
                   
			var yAxisScale = d3.scale.linear()
				.range([height, 0]);

			var line = d3.svg.line()
				.interpolate('linear')//('cardinal')
				.x(function(d) { return x(d.name); })
				.y(function(d) { return y(d.count); });

			var xAxis = d3.svg.axis()
				.scale(x);

			var yAxis = d3.svg.axis()
				
				.orient('left')
				.ticks(5);

			var drawLineChart = function(data) {
				///Axis tick values
				var tickValues = [];

				/**
				 * container selection
				 * @type {[type]}
				 */
				var container = d3.select(element[0])
					.append('svg')
					.attr({
						width: width + margin.left + margin.right,
						height: height + margin.top + margin.bottom
					})
					.append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				angular.forEach(data, function(value) {
					tickValues.push(value.name);
				});

				var tickLength = tickValues.length;
				var newValues = tickLength > 10 ? [] : tickValues;
				if(tickLength > 10) {
					var space = tickValues % 2 ? Math.floor(tickLength / 4) : Math.floor(tickLength / 5);
					
					for(var i = 0; i < tickLength; i++) {
						i += space;
						newValues.push(tickValues[i]);
					}
				}
				var totalVal = 0;
				angular.forEach(data, function(value) {
					totalVal += value.count;
					// maxValue = maxValue > value.count ? maxValue : value.count;
				});

				xAxis.tickValues(newValues);
				x.domain(tickValues);
				
				if(scope.normalize) {///Weird behaviour but it works!
					y.domain([0, totalVal]);

					yAxis.scale(yAxisScale).tickFormat(yNormalizedFormat);
				}
				else {
					// maxValue
					y.domain(d3.extent(data, function(d){ return d.count; }));
					yAxis.scale(y).tickFormat(yTickFormat);
				}
				// xAxis.orient('bottom');
				container.append('g')
					.attr({
						'class': 'axis',
						'transform': 'translate(0,' + height +')'
					})
					.call(xAxis);
				container.append('g')
					.attr({
						'class': 'axis',
					})
					.call(yAxis)
					.append('text')
					.attr('transform', 'rotate(-90)')
					.attr('y', 6)
					.attr('dy', '.71em')
					.style('text-anchor', 'end')
					.text(attrs.yaxisname);

				var path = container.append('path')
					.attr({
						'd': line(data),
						'class': 'line',
						'stroke-width': 2
					});

				// var circle = container.append('circle')
				// 	.attr({
				// 		'cx': 100,
				// 		'cy': 350,
				// 		'r': 3,
				// 		'fill': 'red'
				// 	});

				var pathEl = path.node();
				var pathLength = pathEl.getTotalLength();
				var BBox = pathEl.getBBox();
				var offsetLeft = document.getElementsByClassName("line")[0].offsetLeft;

				path.attr({
					'stroke-dasharray': pathLength + ' ' + pathLength,
					'stroke-dashoffset': pathLength
				})
				.transition()
					.duration(1000)
					.ease('linear')
					.attr('stroke-dashoffset', 0);


				//TODO circle hightlighting the point on line graph.
				// container.on('mousemove', function(d) {
				// 	var x = d3.event.pageX - offsetLeft;
				// 	var beginning = x, 
				// 		end = pathLength, 
				// 		target;

				// 	while (true) {
				// 		target = Math.floor((beginning + end) / 2);
				// 		var pos = pathEl.getPointAtLength(target);
				// 		if((target === end || target === beginning) && pos.x !== x) {
				// 			break;
				// 		}
				// 		if ( pos.x > x ) end = target;
				// 		else if (pos.x < x) beginning = target;
				// 		else break; //position found
				// 	}

				// 	circle.attr({
				// 		'opacity': 1,
				// 		'cx': x,
				// 		'cy': pos.y
				// 	});

				// })
					
			};
			//Don't try to draw before data loads. 
			if(data) { drawLineChart(data); }
			
			//Watch for data and rerender the graph
			scope.$watch('data', function(newVal, oldVal){
				//Don't draw if the data hasn't changed. 
				if (newVal === oldVal) { return; }
				element.empty();
				drawLineChart(data);
				
			}, true);///watch


		};///postLink

		return {
			restrict: 'EA',
			scope: {
				data: '=',
				width: '@',
				height: '@',
				yaxisname: '@',
				ytickformat: '&',
				normalize: '='
			},
			link: postLink
		};
	}]);
