'use strict';
/* globals d3 */


/**
 * @ngdoc directive
 * @name app.dashboard.directive:chord
 * @description
 * # chord
 */
angular.module('app.dashboard')
	.directive('chord',[function() {
		var groupTicks = function(d) {
			var k = (d.endAngle - d.startAngle) / d.value;
			return d3.range(0, d.value, 1000).map(function(v,i){
				return {
					angle: v * k + d.startAngle,
					label: i % 5 ? null : v/1000 + k ///CHANGE to tabel title
				};
			});
		};



		return {
			restrict: 'E',
			scope: {
				matrix: '='
			},
			link: function postLink(scope, element) {

				//Data
				var matrix = scope.matrix;
				//Layout
				var chord = d3.layout.chord()
					.padding(0.05)
					.sortSubgroups(d3.descending)
					.matrix(matrix);

				var width = element.innerWidth() || 900;
				// console.log('w',width);
				var height = 500;
				var innerRadius = Math.min(width, height) * 0.41;
				var outerRadius = innerRadius * 1.1;

				var fill = d3.scale.ordinal()
					.domain(d3.range(4))
					.range(['#000000', '#FFDD89', '#957244', '#F26223']);//CHANGE it to colors from an attribute

				var svg = d3.select('body').append('svg')
					.attr({
						'width': width,
						'height': height
					})
					.append('g')
					.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
				function fade(opacity) {
						return function(g,i) {
							svg.selectAll('.chord path')
								.filter(function(d){ return d.source.index !== i && d.target.index !== i; })
								.transition()
								.style('opacity', opacity);
						};
					}

				svg.append('g').selectAll('path')
					.data(chord.groups)
					.enter().append('path')
					.style('fill', function(d) {return fill(d.index); })
					.style('stroke', function(d){ return fill(d.index); })
					.attr('d', d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
					.on('mouseover', fade(0.1))
					.on('mouseout', fade(1));

					var ticks = svg.append('g').selectAll('g')
						.data(chord.groups)
						.enter().append('g').selectAll('g')
						.data(groupTicks)
						.enter().append('g')
						.attr('transform', function(d){
							return 'rotate(' + (d.angle * 180 /Math.PI - 90) + ')' + 'translate(' + outerRadius + ',0)';
						});

					ticks.append('line')
						.attr({
							'x1': 1,
							'y1': 0,
							'x2': 5,
							'y2': 0
						})
						.style('stroke', '#000');
					ticks.append('text')
						.attr({
							'x': 8,
							'dy': '.35em'
						})
						.attr('transform', function(d){ return d.angle > Math.PI ? 'rotate(180) translate(-16)': null;})
						.style('text-anchor', function(d){ return d.angle > Math.PI ? 'end': null; })
						.text(function(d) { return d.label; });

					svg.append('g')
						.attr('class', 'chord')
						.selectAll('path')
						.data(chord.chords)
						.enter().append('path')
						.attr('d', d3.svg.chord().radius(innerRadius))
						.style('fill', function(d){ return fill(d.target.index); })
						.style('opacity', 1);

			}
		};
	}]);
