'use strict';

/* Controllers */

// angular.module('main').controller('HomeController', ['$scope', '$location', function($scope, $location) {
// 	function start() {
// 		console.log($scope);
// 		console.log($location);
// 	}

// 	var init = function() {
// 		start();
// 	};

// 	init();
// }]);


var homeController = function($scope, $location) {
	function start() {
		console.log($scope);
		console.log($location);
	}

	var init = function() {
		start();
	};

	init();
};

module.exports = homeController;