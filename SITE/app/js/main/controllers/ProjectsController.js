'use strict';

/* projectsController */

var projectsController = function($scope, $location) {

	function start() {
		console.log('Projects');
	}

	var init = function() {
		start();
	};

	init();
};

module.exports = projectsController;
