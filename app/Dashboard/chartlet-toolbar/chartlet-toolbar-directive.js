'use strict';

/**
 * @ngdoc directive
 * @name app.directive:chartletToolbar
 * @description
 * # chartletToolbar
 */
angular.module('app.dashboard')
	.directive('chartletToolbar', ['$mdBottomSheet', function($mdBottomSheet) {

		var postLink = function(scope, element, attrs) {

			// Default graph type
			scope.graphType = 'bar';

			/**
			 * Changes the graph type
			 * @param  {string} graph type 
			 */
			scope.changeGraphType = function(type) {
				scope.graphType = type;
			};

			var toggle = function() {
				console.log('normalize in directive ', scope.normalize);
				scope.normalize = !scope.normalize;
				console.log('normalize in directive ', scope.normalize);
			}
			scope.showButtomSheet = function($event) {
				// console.log('event is ',$event);
				var parentEl = element.parent();
				$mdBottomSheet.show({
					templateUrl: '/Dashboard/chartlet-toolbar/md-bottom-sheet-temp.html',
					parent:element,///parentEl,
					locals: {toggle: toggle},
					controller: 'AgeDetailController',
					targetEvent: $event
				}).then(function(clickedItem) {
					console.log(' clicked!');
				});
			}

			scope.items = [
				{ name: 'Share', icon: 'share' },
				{ name: 'Upload', icon: 'upload' },
				{ name: 'Copy', icon: 'copy' },
				{ name: 'Print this page', icon: 'print' }
			];
				
		};
		return {
			restrict: 'EA',
			// templateUrl:'/Dashboard/chartlet-toolbar/chartlet-toolbar-temp.html',
			// For dev error, switch back to templateUrl for production. 
			template: '<section layout="row" layout-sm="column" layout-align="center center" class="chartlet-toolbar">' +
						'<md-button class="md-fab" aria-label="Settings" ng-click="showButtomSheet($event)">' +
							'<i class="fa fa-gear"></i>' +
							'<md-tooltip>Settings</md-tooltip>' +
						'</md-button>' +
						'<md-button class="md-fab" aria-label="Bar chart">' +
							'<i class="fa fa-bar-chart-o" ng-click="changeGraphType(\'bar\')"></i>' +
							'<md-tooltip>Bar Graph</md-tooltip>' +
						'</md-button>' +
						'<md-button class="md-fab" aria-label="Line chart">' +
							'<i class="fa fa-line-chart" ng-click="changeGraphType(\'line\')"></i>' +
							'<md-tooltip>Line Graph</md-tooltip>' +
						'</md-button>' +
						'<md-button class="md-fab" aria-label="Pie chart">' +
							'<i class="fa fa-pie-chart" ng-click="changeGraphType(\'pie\')"></i>' +
							'<md-tooltip>Pie Graph</md-tooltip>' +
						'</md-button>' +
					'</section>',
			link: postLink
		};

	}]);


// Normalization
// Pivot
// High Contrast
