'use strict';
/*global d3*/

/**
 * @ngdoc directive
 * @name app.dashboard.directive:partitionGraph
 * @description
 * # partitionGraph
 */
angular.module('app.dashboard')
	.directive('partitionGraph',  ['$filter',function($filter) {
		function capitalizeFilter(input) {
			return $filter('capitalize')(input);
		}

	//Size variables
	var margin = {top: 10, right: 10, bottom: 20, left: 100};
	// var width = 800;
	var width = 500;
	var height = 460;
	var radius = Math.min(width, height) / 2;
	var totalSize = 0;
	
	var link = function(scope, el, attr) {


		var color = d3.scale.category10();
		var data = scope.data;
		var half = halfMultiplier(attr.half);
		var percentageString = data.name;

		var svg = d3.select(el[0]).append('svg:svg')
					.attr({
						'width': width,
						'height': height
					})
				.append('svg:g')
					.attr({
						'class': 'partition-container',
						'transform': 'translate(' + height / 2 +',' + height / 2 + ')'
					});

		/**
		 * Text in the center of the partition graph
		 */
		var text = svg.append('text')
			.attr({
				'x': 0,
				'y': 0
			})
			.style('text-anchor', 'middle')
			.text(percentageString);


		//Partition layout
		var partition = d3.layout.partition()
			.sort(null)
			.size([2 * Math.PI, radius * radius])
			.value(function(d) { return 0; });

		//Arc description function
		var arc = d3.svg.arc()
			.startAngle(function(d) { return (d.x) * half; })
			.endAngle(function(d) { return (d.x + d.dx) * half; })
			.innerRadius(function(d){ return Math.sqrt(d.y); })
			.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

		//Path 
		var path = svg.datum(data).selectAll('path')
			.data(partition.nodes)
			.enter().append('path')
			.attr('display', function(d) { return d.depth ? null : 'none'; }) //hide inner ring
			.attr('d', arc)
			.style("opacity", 0.5)
			.style('stroke', '#fff')
			.style('fill', function(d) { return color((d.children ? d : d.parent).name); })
			.style('fill-rule', 'evenodd')
			.each(stash)
			.on('mouseover', mouseover)
			.on('mouseout', mouseout)
			.on('click', goToDetail);

		//Transition paths
		path.data(partition.value(function(d){ return d.count;}).nodes)
			.transition()
			.ease("linear")
			.duration(1000)
			.style("opacity", 1)
			.attrTween("d", arcTween);



		//Gets the total size of all segments from the path selection.
		totalSize = path.node().__data__.value;
		
		//False until the details title has been appended to the page
		var detailsInitialized = false;

		//Append an container for the details
		var detailContainer = d3.select(el[0]).append('div');
		

		/**
		 * Moseover behavior for path
		 * @param  {object} datum
		 */
		function mouseover (d) {
			var percentage = (100 * d.value / totalSize).toPrecision(3);
			percentageString = d.name + ': ' + percentage + '%';
			if(percentage < 0.1) { percentageString = d.name + ': ' + '< 0.1%'; }
			text.text(percentageString);

			detailContainer.append('h3').text("Details:").style("opacity", 0).transition().duration(800).style("opacity", 1);
			
			var ul = detailContainer.append('div').attr("class", "nested-details").append('ul');
			
			//Repopulate detail display
			addToList(ul, d);


		};//mouseover

		/**
		 * Moseout behavior for path
		 * @param  {object} datum
		 */
		function mouseout(d) {
			// Clear detailContainer
			detailContainer.transition()
		    .duration(200)
		    .ease("linear")
		    .each(function() {

		    	//remove all child nodes
			    d3.selectAll(this.childNodes).transition()
			    	.style("opacity", 0)
			    	.remove();
		    });
		}

		/**
		 * Append a single list item to a parent element
		 * @param {[html element]} parentElement
		 * @param {[object]} item
		 */
		function addToList(parentElement, item) {
			var node = parentElement.append("li")
				.text(capitalizeFilter(item.name) + (!!item.count ? "  -  " + item.count : ": "))
				.attr('class', function(){ return !!item.count ? "item" : "category"; });

			node.style("opacity", 0);
			node.transition().delay(200).duration(400)
				.ease("linear")
				.style("opacity", 1);
			if(item.children) {
				node = node.append('ul')
				renderChildren(node, item.children);
			}
		}//addToList

		/**
		 * Append each child in collection 
		 * @param  {[html element]} parentElement
		 * @param  {[array]} children    [array of child objects]
		 * @return {[type]}             [description]
		 */
		function renderChildren(parentElement, children) {
			children.forEach(function(child) {
				addToList(parentElement, child);
			});
		}//renderChildren

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

		/**
		 * Go to the detail page.
		 * @param  {object} datum
		 * @return {[type]}
		 */
		function goToDetail (d) {
			//TODO go to detail page. 
		}

	};///linking function
			
		var halfMultiplier = function(val) { 
			if(val === 'left') { return -0.5; }
			if(val === 'right') { return 0.5; }
			return 1;
		};///halfMultiplier

		// Stash the old values for transition.
		var  stash = function(d) {
			d.x0 = d.x;
			d.dx0 = d.dx;
		};///stash

		

	// };

	return {
		// template: '<div class="percentageSting"></div>',
		restrict: 'E',
		scope: {
			data: '=',
			half: '=',
			height: '@',
		},
		link: link
	};
  }]);
