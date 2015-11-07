'use strict';

/* projectsController */

var projectsController = function($scope, $location) {

	function start() {
		console.log('Projects');
	}

	var init = function() {
		start();
	};

	$scope.over = function() {
		console.log('over');
		console.log(event);
	}

	init();
};

module.exports = projectsController;
