'use strict';


/**
 * @ngdoc overview
 * @name app.dashboard
 * @description
 * # app.dashboard
 *
 * Main module of the dashboard application.
 */
angular
	.module('app.dashboard', [
		'	.service.searchDataService',
		'app.service.demographicsDataService',
		'app.service.geoDataService',
		// 'ngAnimate',
		// 'ngCookies',
		// 'ngResource',
		// 'ngRoute',
		// 'ngSanitize',
		// 'ngTouch',
		'ui.select',//For more info on ui.select/router/bootstrap https://github.com/angular-ui
		'ui.router',
		'ngMaterial'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', 'uiSelectConfig', function ($stateProvider, $urlRouterProvider, $controllerProvider, uiSelectConfig){
		$stateProvider
			.state('app.dashboard', {
				url: 'dashboard',
				views: {
					'body@': {
						templateUrl: 'Dashboard/dashboard.html',
						controller: 'DashboardController'
					},
					'sidebar@app.dashboard': {
						templateUrl: 'Dashboard/sidebar/sidebar.tpl.html',
						controller: 'SideBarController'
					},
					'content@app.dashboard': {
						templateUrl: 'common/content.tpl.html',
						controller: 'DashboardController'
					}
				}
			})
			.state('app.dashboard.coming', {
				url:'/ComingSoon',
				views: {
					'content@app.dashboard': {
						templateUrl: 'common/coming-soon.tpl.html',
					}
				}
			})
			.state('app.dashboard.item', {
				url: '/:item',
				views: {
					'content@app.dashboard': {
						templateUrl: function($stateParams){
							var item = $stateParams.item.split(' ')[0].toLowerCase();//for Physical Attributes
							return 'Dashboard/' + item + '/' + item + '.html';//'/' + item + 
						},
						controller:'DashboardItemController'
					}
				}
			})
			.state('app.dashboard.detail', {
				url: '/:item/:detail',
				views: {
					'content@app.dashboard': {
						templateUrl:  function($stateParams){
							var item = $stateParams.item.split(' ')[0].toLowerCase();
							var detail = $stateParams.detail.split(' ')[0].toLowerCase();
							return 'Dashboard/' + item + '/' + detail + '/' + detail + '.html';
						},
						controllerProvider: function($stateParams) {
							return $stateParams.detail.split(' ')[0] + 'DetailController';
						}
					}
				}
			});

			//Theme selection for angular-ui-select
			uiSelectConfig.theme = 'selectize';
	}]);
