'use strict';

/* aboutController */

var aboutController = function($scope, $location) {

	function start() {
		console.log('About');
	}

	var init = function() {
		start();
	};

	init();
};

module.exports = aboutController;
