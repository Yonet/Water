'use strict';


/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
	.module('app', [
		'app.dashboard',
		'app.service.searchDataService',
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'restangular',
		'ui.select',//For more info on ui.select/router/bootstrap https://github.com/angular-ui
		'ui.router',
		'ui.bootstrap',
		'ui.bootstrap.typeahead',
		'ui.bootstrap.tpls'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'uiSelectConfig', '$tooltipProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, uiSelectConfig, $tooltipProvider) {


		//Using Ui-router. For more info: https://github.com/angular-ui/ui-router
		$stateProvider
			.state('app', {
				url: '/',
				views: {
					'header': {
						templateUrl: 'common/header.tpl.html',
						controller: "MainController"
					},
					'body': {
						templateUrl: 'common/body.tpl.html',
						controller: 'MainController'
					},
					'footer': {
						templateUrl: 'common/footer.tpl.html'
					}
				}
			})
			.state('app.coming', {
				url:'/ComingSoon',
				views: {
					'body@': {
						templateUrl: 'common/coming-soon.tpl.html',
					}
				}
			});
			
			$urlRouterProvider.otherwise('/');

			//$tooltipProvider.setTriggers({'$rootScope.popover': '$rootScope.popover'});
			

			//RestangularProvider.setBaseUrl('http://dev.ay.com/services/reporting/v2');
			
			

			//https://www.npmjs.org/package/json-server
			//Using json-server http://dev.ay.com/services/reporting/v2/reports/question-insights/Q0000000000000000001 to serve the data.
			// RestangularProvider.setBaseUrl('http://localhost:3000/');//Temp data base url
			// RestangularProvider.setDefaultRequestParams({ });
			// $httpProvider.responseInterceptors.push('httpInterceptor');

			//Theme selection for angular-ui-select
			uiSelectConfig.theme = 'selectize';
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

	}]).run(['api', '$rootScope', function (api, $rootScope) {
		api.init();

		$rootScope.filters = [];
		$rootScope.safeApply = function(fn) {
			var phase = $rootScope.$$phase;
			if (phase === '$apply' || phase === '$digest') {
				if (fn && (typeof(fn) === 'function')) {
					fn();
				}
			} else {
				this.$apply(fn);
			}
		};
		// $rootScope.popover;
		$rootScope.$broadcast('popover', $rootScope.popover);
	}]);



