'use strict';

/* projectsController */

var projectsController = function($scope, $location) {
	function start() {
		console.log($scope);
		console.log($location);
	}

	var init = function() {
		start();
	};

	init();
};

module.exports = projectsController;
