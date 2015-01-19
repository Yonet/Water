
'use strict';

/**
 * @ngdoc service
 * @name app.demographicsDataService
 * @description
 * # demographicsDataService
 * Factory in the app.
 */
angular.module('app.service.demographicsDataService', [])
	.factory('demographicsDataService', [function () {

		var service = {};

		service.data = {
			meta: {
				locale: "US_en",
				parent: "demographics",
				filters: []
			},  
			data: [
				{
					code: "age_groups",
					name: "Age Groups",
					type: "po-line-chart",
					data: [
						{
							code: "ageGroupUnder18",
							name: "Under 18",
							count: 9099
						},
						{
							code: "ageGroup18to24",
							name: "18 to 24",
							count: 14803
						},
						{
							code: "ageGroup25to34",
							name: "25 to 34",
							count: 11696
						},
						{
							code: "ageGroup25to34",
							name: "35 to 50",
							count: 8601
						},
						{
							code: "ageGroup50plus",
							name: "35 to 50",
							count: 5036
						}
					]
				},
				{
					code: "countries",
					name: "Countries",
					data: [
						{
							code: "US",
							name: "United States",
							count: 15135
						},
						{
							code: "CA",
							name: "Canada",
							count: 711
						},
						{
							code: "GB",
							name: "Great Britian",
							count: 334
						},
						{
							code: "AU",
							name: "Austrailia",
							count: 172
						},
						{
							code: "IE",
							name: "Ireland",
							count: 450
						}
					]
				},
				{
					code: "gender",
					name: "Gender",
					data: [
						{
							code: "genderOther",
							name: "Prefer Not To State",
							count: 93156
						},
						{
							code: "genderFemale",
							name: "Female",
							count: 35599
						},
						{
							code: "genderMale",
							name: "Male",
							count: 873
						}
					]
				},
				{
					code: "ethnicity",
					name: "Ethnicity",
					data: [
						{
							code: "raceAlaskaNativeAmericanIndian",
							name: "Alaska / Native American / Indian",
							count: 439
						},
						{
							code: "raceAsian",
							name: "Asian",
							count: 816
						},
						{
							code: "raceAsianIndian",
							name: "Asian Indian",
							count: 245
						},
						{
							code: "raceBlackAfricanAmerican",
							name: "Black / African American",
							count: 618
						},
						{
							code: "raceCaucasian",
							name: "Caucasian",
							count: 3534
						},
						{
							code: "raceHispanicLatinAmerican",
							name: "Hispanic / Latin American",
							count: 1163
						},
						{
							code: "raceNativeHawaiianPacificIslander",
							name: "Native Hawaiian / Pacific Islander",
							count: 212
						},
						{
							code: "raceMiddleEastern",
							name: "Middle Eastern",
							count: 323
						}
					]
				},
				{
					code: "incomeHousehold",
					name: "Household Income",
					data: [
						{
							code: "incomeHouseholdSub35K",
							name: "Sub 35K",
							count: 5850
						},
						{
							code: "incomeHousehold35K60K",
							name: "35K to 60K",
							count: 47380
						},
						{
							code: "incomeHousehold60K75K",
							name: "60K to 75K",
							count: 58580
						},
						{
							code: "incomeHousehold75K100K",
							name: "75K to 100K",
							count: 57590
						},
						{
							code: "incomeHousehold100K150K",
							name: "100K to 150K",
							count: 57570
						},
						{
							code: "incomeHousehold150KMore",
							name: "150K or More",
							count: 20200
						}
					]
				},
				{
					code: "educationAttainmentLevel",
					name: "Education Attainment",
					data: [
						{
							code: "educationAttainmentLessThanHighSchool",
							name: "Less Than High School",
							count: 48480
						},
						{
							code: "educationAttainmentHighSchool",
							name: "High School",
							count: 5890
						},
						{
							code: "educationAttainmentCollege",
							name: "College",
							count: 10020
						},
						{
							code: "educationAttainmentGraduate",
							name: "Graduate",
							count: 38480
						}
					]
				},
				{
					code: "maritalStatus",
					name: "Marital Status",
					data: [
						{
							code: "married",
							name: "Married",
							count: 200
						},
						{
							code: "divorced",
							name: "Divorced",
							count: 100
						},
						{
							code: "single",
							name: "Single",
							count: 300
						}
					]
				},

			]
		};
		service.detailDataAge = { 
			"meta": {
				"locale": "US_en",
				"parent": "demographics",
				"related": ["gender", "ethnicity", "household"],
				"filters": []
			},
			"data": [
				{
					"code": "age_series",
					"name": "Age Series",
					"filters": [
						{
							"code": "latest",
							"name": "Latest",
							"data": [
								{
									"code": "latest30days",
									"name": "Latest Month"
								},
								{
									"code": "latest60days",
									"name": "Latest 2 Months"
								},
								{
									"code": "latest90days",
									"name": "Latest 3 Months"
								}
							]
						},
						{
							"code": "selection",
							"name": "Selection"
						},
						{
							"code": "range",
							"name": "Range"
						}
					],
					"data": [
						{
							"code": "1",
							"name": "1",
							"count": 417
						},
						{
							"code": "2",
							"name": "2",
							"count": 4
						},
						{
							"code": "3",
							"name": "3",
							"count": 3
						},
						{
							"code": "4",
							"name": "4",
							"count": 4
						},
						{
							"code": "5",
							"name": "5",
							"count": 5
						},
						{
							"code": "6",
							"name": "6",
							"count": 3
						},
						{
							"code": "7",
							"name": "7",
							"count": 4
						},
						{
							"code": "8",
							"name": "8",
							"count": 1
						},
						{
							"code": "9",
							"name": "9",
							"count": 4
						},
						{
							"code": "10",
							"name": "10",
							"count": 21
						},
						{
							"code": "11",
							"name": "11",
							"count": 99
						},
						{
							"code": "12",
							"name": "12",
							"count": 228
						},
						{
							"code": "13",
							"name": "13",
							"count": 718
						},
						{
							"code": "14",
							"name": "14",
							"count": 1401
						},
						{
							"code": "15",
							"name": "15",
							"count": 1617
						},
						{
							"code": "16",
							"name": "16",
							"count": 1718
						},
						{
							"code": "17",
							"name": "17",
							"count": 1597
						},
						{
							"code": "18",
							"name": "18",
							"count": 2126
						},
						{
							"code": "19",
							"name": "19",
							"count": 2165
						},
						{
							"code": "20",
							"name": "20",
							"count": 1811
						},
						{
							"code": "21",
							"name": "21",
							"count": 1755
						},
						{
							"code": "22",
							"name": "22",
							"count": 1722
						},
						{
							"code": "23",
							"name": "23",
							"count": 1926
						},
						{
							"code": "24",
							"name": "24",
							"count": 1561
						},
						{
							"code": "25",
							"name": "25",
							"count": 1411
						},
						{
							"code": "26",
							"name": "26",
							"count": 1331
						},
						{
							"code": "27",
							"name": "27",
							"count": 1122
						},
						{
							"code": "28",
							"name": "28",
							"count": 1075
						},
						{
							"code": "29",
							"name": "29",
							"count": 1031
						},
						{
							"code": "30",
							"name": "30",
							"count": 981
						},
						{
							"code": "31",
							"name": "31",
							"count": 883
						},
						{
							"code": "32",
							"name": "32",
							"count": 806
						},
						{
							"code": "33",
							"name": "33",
							"count": 861
						},
						{
							"code": "34",
							"name": "34",
							"count": 831
						},
						{
							"code": "35",
							"name": "35",
							"count": 648
						},
						{
							"code": "36",
							"name": "36",
							"count": 670
						},
						{
							"code": "37",
							"name": "37",
							"count": 536
						},
						{
							"code": "38",
							"name": "38",
							"count": 499
						},
						{
							"code": "39",
							"name": "39",
							"count": 515
						},
						{
							"code": "40",
							"name": "40",
							"count": 459
						},
						{
							"code": "41",
							"name": "41",
							"count": 479
						},
						{
							"code": "42",
							"name": "42",
							"count": 494
						},
						{
							"code": "43",
							"name": "43",
							"count": 523
						},
						{
							"code": "44",
							"name": "44",
							"count": 490
						},
						{
							"code": "45",
							"name": "45",
							"count": 436
						},
						{
							"code": "46",
							"name": "46",
							"count": 400
						},
						{
							"code": "47",
							"name": "47",
							"count": 370
						},
						{
							"code": "48",
							"name": "48",
							"count": 364
						},
						{
							"code": "49",
							"name": "49",
							"count": 364
						},
						{
							"code": "50",
							"name": "50",
							"count": 334
						},
						{
							"code": "51",
							"name": "51",
							"count": 305
						},
						{
							"code": "52",
							"name": "52",
							"count": 287
						},
						{
							"code": "53",
							"name": "53",
							"count": 309
						},
						{
							"code": "54",
							"name": "54",
							"count": 297
						},
						{
							"code": "55",
							"name": "55",
							"count": 282
						},
						{
							"code": "56",
							"name": "56",
							"count": 274
						},
						{
							"code": "57",
							"name": "57",
							"count": 235
						},
						{
							"code": "58",
							"name": "58",
							"count": 197
						},
						{
							"code": "59",
							"name": "59",
							"count": 187
						},
						{
							"code": "60",
							"name": "60",
							"count": 154
						},
						{
							"code": "61",
							"name": "61",
							"count": 129
						},
						{
							"code": "62",
							"name": "62",
							"count": 128
						},
						{
							"code": "63",
							"name": "63",
							"count": 117
						},
						{
							"code": "64",
							"name": "64",
							"count": 93
						},
						{
							"code": "65",
							"name": "65",
							"count": 87
						},
						{
							"code": "66",
							"name": "66",
							"count": 76
						},
						{
							"code": "67",
							"name": "67",
							"count": 70
						},
						{
							"code": "68",
							"name": "68",
							"count": 45
						},
						{
							"code": "69",
							"name": "69",
							"count": 47
						},
						{
							"code": "70",
							"name": "70",
							"count": 41
						},
						{
							"code": "71",
							"name": "71",
							"count": 25
						},
						{
							"code": "72",
							"name": "72",
							"count": 24
						},
						{
							"code": "73",
							"name": "73",
							"count": 21
						},
						{
							"code": "74",
							"name": "74",
							"count": 14
						},
						{
							"code": "75",
							"name": "75",
							"count": 17
						},
						{
							"code": "76",
							"name": "76",
							"count": 8
						},
						{
							"code": "77",
							"name": "77",
							"count": 8
						},
						{
							"code": "78",
							"name": "78",
							"count": 7
						},
						{
							"code": "79",
							"name": "79",
							"count": 5
						},
						{
							"code": "80",
							"name": "80",
							"count": 2
						},
						{
							"code": "81",
							"name": "81",
							"count": 5
						},
						{
							"code": "82",
							"name": "82",
							"count": 4
						},
						{
							"code": "83",
							"name": "83",
							"count": 1
						},
						{
							"code": "85",
							"name": "85",
							"count": 3
						},
						{
							"code": "86",
							"name": "86",
							"count": 1
						},
						{
							"code": "87",
							"name": "87",
							"count": 3
						},
						{
							"code": "88",
							"name": "88",
							"count": 1
						},
						{
							"code": "91",
							"name": "91",
							"count": 1
						},
						{
							"code": "94",
							"name": "94",
							"count": 1
						},
						{
							"code": "102",
							"name": "102",
							"count": 1
						},
						{
							"code": "108",
							"name": "108",
							"count": 1
						},
						{
							"code": "113",
							"name": "113",
							"count": 5
						},
						{
							"code": "114",
							"name": "114",
							"count": 7
						},
						{
							"code": "115",
							"name": "115",
							"count": 2
						}
					]
				}
			]
		};///detail data

		angular.forEach(service.data.data, function(value) {
			var dataName = value.name.split(' ', 1)[0].toLowerCase() + 'Data';
			service[dataName] = value.data;
		});
		return service;

	}]);