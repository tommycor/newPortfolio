'use strict';

/* singleController */

var singleController = function($scope, $location, $routeParams) {

	function start() {
		console.log('Single');
		console.log($routeParams);
	}

	var init = function() {
		start();
	};

	init();
};

module.exports = singleController;
