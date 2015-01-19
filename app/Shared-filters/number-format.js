'use strict';

/**
 * @ngdoc filter
 * @name app.filter:numberFormat
 * @function
 * @description
 * # numberFormat
 * Filter in the app.
 */
angular.module('app')
	.filter('numberFormat', [function () {
		return function (number) {
			if (number !== undefined) {
				var abs = Math.abs(number);
				if (abs >= Math.pow(10,12)) {//trillion
					number =  (number / Math.pow(10, 12)).toFixed(1)+ 't';
				} else if (abs < Math.pow(10,12) && abs >= Math.pow(10, 9)) {//billion
					number =  (number / Math.pow(10, 9)).toFixed(1)+ 'b';
				} else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6)) {//million
					number =  (number / Math.pow(10, 6)).toFixed(1)+ 'm';
				} else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3)) {//thousand
					number =  (number / Math.pow(10,3)).toFixed(1)+ 'k';
				}
			}
			return number;
		};
	}]);
