'use strict';
/*global d3*/

/**
 * @ngdoc function
 * @name app.dashboard.directive:poStateMap
 * @description
 * # poStateMap Directive
 * Controller of the app
 */

angular.module('app.dashboard')
	.directive('poStateMap', [function() {

		var postLink = function(scope, el, attr) {
			var width = el[0].clientWidth,
			height = el[0].clientHeight,
			geometry = scope.geometry,
			color = d3.scale.linear().range(['#E74C3C', '#27AE60'])
			
			
			var projection = d3.geo.albersUsa()
				.scale(500)
				.translate([width / 2, height / 2]);
			
			var path = d3.geo.path()
				.projection(projection);
			
			var svg = d3.select(el[0]).append('svg')
				.attr({
					width: width,
					height: height
				});

			d3.json('geo-files/states.topo.json', function(error, world){
				if(error) console.log('error');
				else 
					console.log('got it');
			})

			scope.$watch('geometry', function(geometry) {
				if (!geometry)
					return
				scope.geometry = geometry
				svg.selectAll('path.state').remove()
				svg.selectAll('path.state')
					.data(topojson.feature(geometry, geometry.objects.states).features)
					.enter().append('path')
					.attr('class', function(d, i) {
						var state = d.properties.state
						return 'state ' + state.toLowerCase().split(' ').join('-')
					})
					.attr('d', path)
				if (scope.data) update();
			})
			
			scope.$watch('data', function(data) {
				scope.data = data
				if (!data) return
				if (scope.geometry) return update()
			})
			
			function update() {
				color.domain(scope.extent)
				scope.data.forEach(update_state)
			}

			function update_state(d) {
				var name = 'path.state.' + d.state.toLowerCase().split(' ').join('-')
				var state = svg.selectAll(name)
				state.style('fill', function() {
					// return 'red'
					if (isNaN(d.value)) return '#999'
						
					else
						return color(d.value)
				})
			}
		}///PostLink function

		return {

			restrict: 'E',
			scope: {
				geometry: '=',
				data: '=',
				extent: '='
			},
			link: postLink
		}

	}])
	.directive('poWorldMap', ['geoDataService', function(geoDataService){
		var postLink = function(scope, el, attr) {

			var width = el[0].clientWidth || 960,
				height = el[0].clientHeight || 500,
				mapScale = 120,
				zoomTranslate = [width/2, height/2 + 100];

			var el = el[0];
			var data = scope.data;

			var color = d3.scale.linear()
				// .domain(scope.extent)
				.range(['#e1f6ff','#3ab4e9']);

			var projection = d3.geo.mercator()
				.center([10, 5])
				.scale(mapScale)
				.rotate([0, 0])
				.translate([width/2, height/2 + 100]);

			var path = d3.geo.path()
				.projection(projection);
				
			var svg = d3.select(el).append('svg')
				.attr({'preserveAspectRatio': 'xMidYMid',
						'id': 'map-container',
						'viewBox': '0 0 ' + width + ' ' + height,
						'width': width,
						'height': height,
						'ng-click': 'countryClicked($event)'
				});

			var tooltipDiv = d3.select(el).append('div')
				.attr('class', 'tooltip')
				.style('opacity', 0);


			svg.append('rect')
				.attr({
					'class': 'background',
					'width': width,
					'height': height,
					'fill': 'none'
				});

			//Appends a group to svg
			var g = svg.append('g');

			var createMap = function() {
				d3.json('Dashboard/demographics/countries/geo-files/replaced.topo.json', function(err, countryBorderData){
					if (err) console.log('cant read data')
					else {

						color.domain(scope.extent);

						g.append('g')
							.attr('id', 'countries')
							.selectAll('path')
							.data(topojson.feature(countryBorderData, countryBorderData.objects.countries).features)
							.enter()
							.append('path')
							.attr({
								'id': function(d) { return d.id; },
								'class': 'land',
								'd': path
							})
							.style('fill', function(d) {
								var colr = scope.data[d.id] ? color(parseInt(scope.data[d.id]), 10) : '#ddd';
								return colr;///Calculate from the total
							})
							.on('mousemove', function(d) {

								// if no data do not show the tooltip
								if (!scope.data[d.id]) return
								d3.select(this)
									.classed('active', true)
									.style('fill', function(d) {
										return color(parseInt(scope.data[d.id]) + 10000);///Calculate from the total
									});

								tooltipDiv.transition()
									.duration(200)
									.style('opacity', 0.9);


								var tooltipString = d.id + ' total: ' + scope.data[d.id],
									tooltipWidth = 170;

								//Calculate tooltip string from the data here 
								// console.log('d3.mouse(el[0])[0]', d3.mouse(el[0])[0]);
								tooltipDiv.html(tooltipString)
									.style('left',  '1100px')
									.style('top',  '500px')
									.style('width', tooltipWidth + 'px');
						})
						.on('mouseout', function (d) {
							d3.select(this)
								.classed('active', false)
								.style('fill', function(d) {
									var colr = scope.data[d.id] ? color(parseInt(scope.data[d.id])) : '#ddd';
									return colr;///Calculate from the total
								});
							tooltipDiv.transition()
								.duration(500)
								.style('opacity', 0);
						});
					}
				});
			}
			
			 

			var zoomScale = 1;

			/**
			 * d3 zoom behavior captures the zooming action. 
			 */
			var zoom = d3.behavior.zoom()
				.on('zoom', function() {

					zoomScale = d3.event.scale;
					// if(zoomScale < 1) { zoomScale = 1; return;}
					zoomTranslate = [-d3.event.translate[0],-d3.event.translate[1]] ;
					g.attr('transform', 'translate('+ d3.event.translate.join(',')+')scale('+d3.event.scale+')');
					g.selectAll('path')
						.attr('d', path.projection(projection));

				});

			svg.call(zoom);
			
			// + and - buttons zooming functions
			var zoomIn = d3.select('.zoom-in');
			var zoomOut = d3.select('.zoom-out');
			zoomIn.on('click', function(){
					zoomScale += 1;
					g.transition()
						.duration(750)
						.attr('transform', 'translate(' + projection.translate() + ')scale(' + zoomScale + ')translate(-' + width/2 + ',-' + (height/2 + 100) + ')');
			});


			zoomOut.on('click', function(){
					zoomScale -= 1;
					if(zoomScale < 1) { zoomScale = 1; return;}
					g.transition()
						.duration(750)
						.attr('transform', 'translate(' + projection.translate() + ')scale(' + zoomScale + ')translate(-' + width/2 + ',-' + (height/2 + 100) + ')');
			});

			//Watch for data change
			
			scope.$watch('data', function(newVal, oldVal) {
				if (!newVal) return;
				if (newVal === oldVal) return;
				createMap();
			}, true)

		};///postlink

		return {

			restrict: 'E',
			scope: {
				data: '=',
				extent: '='
			},
			link: postLink
		}

	}]);
