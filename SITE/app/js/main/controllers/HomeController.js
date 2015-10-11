'use strict';

/* homeController */


var homeController = function($scope, $location) {

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
