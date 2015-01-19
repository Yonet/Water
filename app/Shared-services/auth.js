'use strict';

/**
 * @ngdoc service
 * @name app.ayAuth
 * @description
 * # ayAuth
 * Service in the app.
 */
angular.module('app')
  .factory('ayAuth', [function ayAuth() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //TODO get the apiKey and source from the user
    //Hard coded apiKey and sourceCode 
    var apiKey = '5b55f9d370714965964266bc9dbf4871';
	var sourceCode = 'ay';


	//Sets users apiKey
	var setApiKey = function(userApiKey) {
		apiKey = userApiKey;
	};

	// Gets apiKey of the user.
	var getApiKey = function() {
		return apiKey;
	};

	//Sets source code of the user
	var setSource = function(source) {
		sourceCode = source;
	};

	//Gets source code. 
	var getSource = function() {
		return sourceCode;
	};

	return {
		setApiKey: setApiKey,
		getApiKey: getApiKey,
		setSource: setSource,
		getSource: getSource
	};
  }]);
