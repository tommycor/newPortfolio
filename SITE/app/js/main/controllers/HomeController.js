'use strict';

/* homeController */


var homeController = function($scope, $location, ScrollManagerService) {

	function start() {
		console.log('home');
		// AboutController.start();
	}

	var init = function() {
		start();
	};

	init();
};

module.exports = homeController;