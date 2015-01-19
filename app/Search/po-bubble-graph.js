'use strict';
/*global d3*/

/**
 * @ngdoc directive
 * @name app.directive:poBubbleGraph
 * @description
 * # poBubbleGraph
 */
angular.module('app')
	.directive('poBubbleGraph', [function () {
		var postLink = function (scope, element, attrs) {
			var el = element[0];
			var data = scope.data;
			var color = d3.scale.category20c();
			var parentWidth = element[0].parentElement.clientWidth;
			var format = d3.format(",d");
			var diameter = parseInt(attrs.width) || parentWidth || 960;
			var parentColors = {};
			
			var pack = d3.layout.pack()
				.sort(null)
				.size([diameter - 5, diameter - 5])
				.value(function(d) { return d.size || 100; })
				.padding(1.5);

			//Matches a color to each category
			angular.forEach(data.children, function(value, key) {
				parentColors[value.name] = color(key);
			})

			//Selects and places the containing svg
			var svg = d3.select(el).append('svg')
				.attr({
					'width': diameter,
					'height': diameter,
					'class': 'bubble',
					'transform':'translate(2,2)'//+ diameter / 2 + ','+ diameter / 2+')'
				});

			//Draws the charts with data
			var drawBubbles = function () {

				var node = svg.selectAll('.node')
					.data(pack.nodes(classes(data))
					.filter(function(d) { return !d.children; }))
					.enter().append('g')
					.attr('class', 'node')
					.attr("transform", function(d) { return "translate(" + _.random(0, diameter) + "," + _.random(0, diameter) + ")"; });
					// .attr({
					// 	'class': function(d){ return d.children ? 'summary-link node': 'detail-link leaf node';},
					// 	'transform': function(d) { return "translate(" + d.x + "," + d.y + ")"; }
					// })
					// node.style('fill', function(d, i) { var name = d.name && d.parent.name || d.name; return parentColors[name]; });
				node.append("title")
      				.text(function(d) { return d.className + ": " + format(d.value); });

				node.append("circle")
					.attr("r", function(d) { return d.r; })
					.style("fill", function(d) { return color(d.packageName); });

				node.append("text")
					.attr("dy", ".3em")
					.style("text-anchor", "middle")
					.text(function(d) { return d.className.substring(0, d.r / 3); });
				
				node.transition()
					.duration(1000)
					.attr({
						'transform': function(d) { return 'translate(' + d.x + ',' + d.y  + ')'; }
					});

				// /**
				//  * On click function 

				//  */
				node.on('click', function(d) { 
					return scope.onClick({
						item: { 
							name: d.name, 
							parent: d.parent.name
						}
					}); 
				});
				
				node.append('title')
					.text(function(d){ return d.name; });

				node.append('circle')
					.attr({
						'r': function(d) { return d.r / 2; }
					}).filter(function(d) { return !d.name == ""; })
					.style('stroke', function(d, i) { var name = d.parent.name || d.name; return parentColors[name]; });

				node.filter(function(d) { return !d.children; })
					.append('text')
					.attr({
						'dy': '0.3em'
					})
					.style('text-anchor', 'middle')
					.text(function(d){ return d.name; });

				node.filter(function(d) { return d.children; })
					.append('text')
					.attr({
						'dy': '0.3em'
					})
					.style('text-anchor', 'end')
					.text(function(d){ return d.name; });

				node.on('mouseover', function(){
					d3.select(this).select('circle')
						.transition()
						.duration(300)
						.attr('r', function(d) {return d.r * 0.8; });
				})
				.on('mouseleave', function(){
				

					d3.select(this).select('circle')
						.transition()
						.duration(400)
						.attr('r', function(d) {return d.r * 0.5; });

				});

			};///drawBubble

			function classes(data) {
				var classes = [];

				function recurse(name, node) {
				if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
				else classes.push({packageName: name, className: node.name, value: node.size || 50});
				}

				recurse(null, data);
				return {children: classes};
			}
			//Don't try to draw before data loads. 
			if(data) { drawBubbles(); }
			
			//Watch for data and rerender the graph
			scope.$watch('data', function(newVal, oldVal){
				//Don't draw if the data hasn't changed. 
				if (newVal === oldVal) { return; }
				element.empty();
				drawBubbles();
				
			});///watch

		};///postlink function

		
		return {
			restrict: 'EA',
			scope: {
				data: '=',
				width: '@',
				height: '@',
				onClick: '&'
			},
			link: postLink
		};
	}]);
