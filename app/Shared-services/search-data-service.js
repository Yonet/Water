'use strict';

/**
 * @ngdoc service
 * @name app.service.searchDataService
 * @description
 * # app.service.searchDataService
 * Factory in the app.
 */
angular.module('app.service.searchDataService', [])
	.factory('searchDataService', ['$rootScope', '$state', function ($rootScope, $state) {
		//SearchDataService object.
		var searchData = {};
		var selectedGroupings = {};
		var selectedFilters = {};

		//Search data object
		searchData.data = {
			"name": "",
			"filters": [
				{"code": "variance-normalize", "name": "Confidence Threshold (2𝝈)"},
				{"code": "within-30-days", "name": "Within Last 30 Days"},
				{"code": "within-60-days", "name": "Within Last 60 Days"},
				{"code": "age-all", "name": "All Groups"},
				{"code": "age-21-less", "name": "Under 21"},
				{"code": "age-21-30", "name": "21 to 30"},
				{"code": "age-31-40", "name": "31 to 40"},
				{"code": "countries-all", "name": "All Countries"},
				{"code": "countries-usa", "name": "USA"},
				{"code": "countries-ethnicity", "name": "Ethnicity"},
				{"code": "gender-women", "name": "Women"},
				{"code": "gender-men", "name": "Man"},
				{"code": "gender-not-stated", "name": "Not Stated"}
			],
			"children": [
				{
					"name": "Brands",
					"filters": [
					],
					"children": [
						{
							"code": "loreal","name": "Loreal", "size": "100",
						},
						{
							"name": "Shiseido", "size": "60",
						},
						{
							"name": "Avon", "size": "55",
						},
						{
							"name": "Estee Lauder", "size": "87",
						},
						{
							"name": "Clinique", "size": "50",
						}
					]
				},//Brands
				{
					"name": "Products",
					"filters": [
					],
					"children": [
					]
				},
				{ "name": 'Physical Attributes',
				  "filters": [],
				  "children": 
				   [{ "name": 'Arm', "code": 'arm', "filters": [
							{ "name": 'Armpit',
							  "code": 'armpit',
							   "size": "60",
							  "parents": [ 'Arm', 'Superficial', 'Body' ] 
							},
							{ "name": 'Biceps',
							  "code": 'biceps',
							   "size": "90",
							  "parents": [ 'Arm', 'Superficial', 'Body' ] 
							},
							{ "name": 'Elbow',
							  "code": 'elbow',
							   "size": "100",
							  "parents": [ 'Arm', 'Superficial', 'Body' ] 
							},
							{ "name": 'Forearm',
							  "code": 'forearm',
							   "size": "40",
							  "parents": [ 'Arm', 'Superficial', 'Body' ] 
							},
							{ "name": 'Hand',
							  "code": 'hand',
							  "size": "120",
							  "parents": [ 'Arm', 'Superficial', 'Body' ] 
							}
						]
					 },
					 { "name": 'Head',"code": 'head',  "size": "60", "filters": [] },
					 { "name": 'Legs',"code": 'legs',  "size": "50","filters": [] },
					 { "name": 'Neck',"code": 'neck',  "size": "70", "filters": [] },
					 { "name": 'Trunk',"code": 'trunk',  "size": "90","filters": [] }
				   ] 
				 },
				{
					"name": "Demographics",
					"filters": [
						
					],
					"children": [
						{ "name": "Age Groups", "code": "age_groups", "size": "100", "parent": "Demographics",
						"filters": [
								{"code": "age-all", "name": "All Groups"},
								{"code": "age-21-less", "name": "Under 21"},
								{"code": "age-21-30", "name": "21 to 30"},
								{"code": "age-31-40", "name": "31 to 40"}
							]
						},
						{ "name": "Countries", "code": "countries",  "size": "60","parent": "Demographics",
						"filters": [
								{"code": "countries-all", "name": "All Countries"},
								{"code": "countries-usa", "name": "USA"},
								{"code": "countries-ethnicity", "name": "Ethnicity"}

							]
						},
						{ "name": "Gender", "code": "gender",  "size": "40", "parent": "Demographics",
						"filters": [
								
								{"code": "gender-women", "name": "Women"},
								{"code": "gender-men", "name": "Man"},
								{"code": "gender-not-stated", "name": "Not Stated"}
							]
						},
						{ "name": "Ethnicity", "code": "ethnicity",  "size": "60", "parent": "Demographics",
						"filters": [
								
								
							]
						},
						{ "name": "Household Income", "code": "incomeHousehold",  "size": "50", "parent": "Demographics",
						"filters": [
								
							]
						},
						{ "name": "Education", "code":  "educationAttainmentLevel",  "size": "60", "parent": "Demographics",
						"filters": [
								
							]
						},
						{ "name": "Marital Status", "code": "maritalStatus",  "size": "30", "parent": "Demographics",
						"filters": [
								
							]
						}
					]
				},
				{
					"name": "Psychographics",
					"filters": [
					],
					"children": [
						{ "name": "Brunch",  "size": "60", "parent": "Psychographics",
						"filters": [
								
							]
						},
						{ "name": "Yoga",  "size": "90", "parent": "Psychographics",
						"filters": [
								
							]
						},
						{ "name": "Fitness",  "size": "75", "parent": "Psychographics",
						"filters": [
								
							]
						},
						{ "name": "Lifestyle",  "size": "55", "parent": "Psychographics",
						"filters": [
								
							]
						},
						{ "name": "Diet",  "size": "40", "parent": "Psychographics",
						"filters": [
								
							]
						}
					]
				},
				{
					"name": "Behavioral",
					"filters": [
						
					],
					"children": [
						{ "name": "Yoga", "size": "60", "parent": "Behavioral",
						"filters": [
							]
						}
					]
				},
				{
					"name": "Preferences",
					"size": "60",
					"filters": [
						
					],
					"children": [
					]
				},
				{
					"name": "Media",
					"size": "60",
					"filters": [
					],
					"children": [
					]
				},
				{
					"name": "Retail",
					"size": "60",
					"filters": [
					],
					"children": [
					]
				},
				{
					"name": "Services",
					"size": "60",
					"filters": [
					],
					"children": [
					]
				},
				{
					"name": "Trends",
					"filters": [
					],
					"children": [
					]
				},
				{
					"name": "Routines",
					"filters": [
					],
					"children": [
					]
				}
			]
		}

		//Grouping and search terms array
		searchData.terms = [];

		/**
		 * Flattens the search data terms and adds the summary/detail class
		 */
		//Note: If parent field is supplied I don't need to define the summary-link and detail-link classes here. These classes are used to style to show parent child relationship in the search dropdown and on the bubble chart directive.
		angular.forEach(searchData.data.children, function(value, key){
			searchData.terms.push({name: value.name, class: 'summary-link'});
			if(value.children) {
				angular.forEach(value.children, function(val){
					searchData.terms.push({name: val.name, code: val.code, class: 'detail-link', parent: value.name});
				})
			}
		});

		$rootScope.selectedGroupings = [];
		$rootScope.selectedFilters = [];


		searchData.getSelected = function(type) {
			if(type === 'group') {
				return $rootScope.selectedGroupings;
			} else {
				return $rootScope.selectedFilters;
			}
		};
		/**
		 * Sets the selected grouping or filters to the selection
		 * @param {obj} selection from searchdata.data obj.
		 * @param {string} type  filter or group
		 */
		searchData.setSelected = function(selection, type) {
			if (type === 'filter' && !$rootScope.selectedFilters[selection.name]) {
				selectedFilters[selection.name] = selectedFilters[selection.name] || selection;
				angular.forEach(selectedFilters, function(value, key) {
					$rootScope.selectedFilters.push(value);
				}) 
				$rootScope.$emit('filters:change');

			} else if (type === 'group' && !$rootScope.selectedGroupings[selection.name]) {
				console.log('group added', selection)
				
				selectedGroupings[selection.name] = selectedGroupings[selection.name] || selection;
				angular.forEach(selectedGroupings, function(value, key) {
					$rootScope.selectedGroupings.push(value);
				}) 
				$rootScope.$emit('grouping:change');
			}


		};

		//All filters to fill global filters dropdown
		searchData.allFilters = searchData.allFilters;

		//Returns filters for global filter search.
		searchData.getAllFilters = function() {

			return searchData.data.filters;
		};

		/**
		 * Selects a search term on the home page to be applied and re-routes to the selected view.
		 * @param  {obj} term is category or sub-category.
		 */
		searchData.selectItem = function(term) {
			// debugger;
			searchData.setSelected(term, 'group');
			var termName = term.name.split(' ')[0];

			// if a detail page go to app.dashboard.detail state...
			if(term.parent) {
				var detail = termName;
				var item = term.parent;
				$state.go('app.dashboard.detail', ({item: item, detail: detail}));
			}
			// if a summary page go to app.dashboard.item state...
			else {
				$state.go('app.dashboard.item', ({item: termName}));
			}

			
		};

		//Search data obj
		return searchData;
	}]);///searchDataService
