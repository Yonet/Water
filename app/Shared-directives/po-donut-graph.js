'use strict';
/*global d3*/

/**
 * @ngdoc directive
 * @name app.dashboard.directive:poDonutGraph
 * @description
 * # poDonutGraph
 */
angular.module('app.dashboard')
	.directive('poDonutGraph', ['$compile',function($compile) {

		var postLink = function (scope, element, attrs) {
			var margin = {top: 0, right: 0, bottom: 20, left: 0};
			
			var parentWidth = element[0].parentElement.clientWidth;
			var parentHeight = element[0].parentElement.clientHeight - 20;
			var width = +attrs.width || parentWidth  || 400;
			width -= margin.right + margin.left;
			var height = +attrs.height || parentHeight|| 400;
			height -= margin.top + margin.bottom;
			var data = scope.data; 
			var normalize = scope.normalize;
			var radius = Math.min(width, height) * 0.5;
		
			var color = d3.scale.linear()
				.range(['#de9ed6', '#7b4173']);

			var arc = d3.svg.arc()
				.outerRadius(radius / 2 * 0.9)
				.innerRadius(radius / 2 * 0.5);

			var pie = d3.layout.pie()
				.sort(null)
				.value(function(d) { return d.count; });


			var svg = d3.select(element[0]).append('svg')
				.attr({
					width: width,
					height: height * 0.7
				});
			var g = svg.append('g')
				.attr('transform', 'translate('+ width * 0.5 + ',' + height * 0.4 + ')');
			var drawDonutGraph = function(data){
				var maxValue = 0;
				var totalVal = 0;

				angular.forEach(data, function(value) {
					totalVal += value.count;
					maxValue = maxValue > value.count ? maxValue : value.count;
				});
				if(scope.normalize===undefined) {///Weird behaviour but it works!
					color.domain([0, totalVal]);
				}
				else {
					color.domain([0, maxValue]);
				}

				// add the <path>s for each arc slice
				var path = g.selectAll('path').data(pie(data))
					.enter().append('path')
					.style('stroke', 'white')
					.attr({
						'd': arc,
						'fill': function(d){ return color(d.value); },
						'tooltip-append-to-body': false,
						'tooltip-trigger': 'mouseenter',
						'tooltip': function(d) {return 'tooltip'; }
					});

				// path.transition()
				// 	.ease('linear')
				// 	.duration(1000)
				// 	.style('opacity', 1)
				// 	.attrTween('d', arcTween);

			};///drawDonutChart

			//Don't try to draw before data loads. 
			if(data) { drawDonutGraph(data); }
		
			//Watch for data and rerender the graph
			scope.$watch('data', function(newVal, oldVal){

				//Don't draw if the data hasn't changed. 
				if (newVal === oldVal) { return; }
				element.empty();
				drawDonutGraph(data);
			}, true);///watch

			/** 
			 * Interpolate the arcs in data space
			 * @param  {[object]} a [the data object]
			 * @return {[a function that calls the arc constructor with new values in the in between transitions state]}   [description]
			 */
			function arcTween(a) {
			  var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
			  return function(t) {
			    var b = i(t);
			    a.x0 = b.x;
			    a.dx0 = b.dx;
			    return arc(b);
			  };
			}

		};///Postlink

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