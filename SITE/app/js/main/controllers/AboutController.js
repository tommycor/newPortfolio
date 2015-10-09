'use strict';

/* aboutController */

var aboutController = function($scope, $location) {
	function start() {
		console.log($scope);
		console.log($location);
	}

	var init = function() {
		start();
	};

	init();
};

module.exports = aboutController;
