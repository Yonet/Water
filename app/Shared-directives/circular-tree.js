'use strict';

/*global d3*/

/**
 * @ngdoc directive
 * @name app.directive:circularTree
 * @description
 * # circularTree
 */
angular.module('app')
	.directive('circularTree', [function () {

		var diameter = 960;
		var tree = d3.layout.tree()
			.size([360, diameter / 2 -120])
			.separation(function(a,b) { console.log('a.parent',a.parent, a.depth);return (a.parent === b.parent ? 1 : 2) / a.depth; });

		var diagonal = d3.svg.diagonal.radial()
			.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });


		var postLink = function (scope, element) {
			var el = element[0];
			var data = scope.data;
			var svg = d3.select(el).append('svg')
				.attr({
					'width': diameter, 
					'height': diameter - 150
				})
				.append('g')
				.attr('transform', 'translate(' + diameter / 2 + ',' + diameter /2 + ')');
				
			
			var update = function() {
				console.log('updating');
				if(!scope.data) { return; }
				var data = scope.data;
				console.log('updating data', data);
				var nodes = tree.nodes(data);
				var links = tree.links(nodes);

				svg.selectAll('.link')
					.data(links)
					.enter().append('path')
					.attr({
						'class': 'link',
						'd': diagonal
					});

				var node = svg.selectAll('.node')
					.data(nodes)
					.enter().append('g')
					.attr({
						'class': 'node',
						'tranform': function(d) { return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')';}
					});

				node.append('cicle')
					.attr({
						'r': 4.5
						// 'fill': function(d, i) { return scope.color[i]; }
					});

				node.append('text')
					.attr({
						'dy': '0.35em',	
						'tex-anchor': function(d) { return d.x < 180 ? 'start': 'end'; },
						'tranform': function(d) { console.log('d', d);return d.x < 180 ? 'translate(8)' : 'rotate(180)translate(-8)'; }
					})
					.text(function(d) { return d.name; });

			};

			if(data) { update(); }
			scope.$watch('data', update);


		};
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			link: postLink
		};
	}]);
