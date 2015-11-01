'use strict';

/* homeController */


var rootController = function($scope, $location, $interval, $window, ScrollManagerService, configService, scrollAnimation) {

	var init = function() {
		console.log('root');
		$scope.setConfig();
		$scope.getPosition();

		// General Listeners
		$window.addEventListener('mousewheel', throttle($scope.mousewheel, $scope.config.UI.wheelThrottle, {
			trailing: false
		}));
	};

	// Goto fonction
	// receive destination path
	$scope.goto = function (dest) {
		$scope.getPosition();

		$scope.$apply(function() {
			$location.path(dest);
		});
		
		$scope.getPosition();
	};

	// Mousewheel function
	// receive mousewheel event
	$scope.mousewheel = function (event) {
		$scope.getPosition();

		event.preventDefault();
		
		var delta = event.deltaY;

		if ( delta > 0 ) {
			if ( typeof $scope.page.next !== 'undefined' ) {	
				ScrollManagerService.setDirection('up');
				$scope.goto($scope.page.next.path);
			}
		}
		else {
			if ( typeof $scope.page.previous !== 'undefined' ) {
				ScrollManagerService.setDirection('down');
				$scope.goto($scope.page.previous.path);
			}
		}
	};

	$scope.setConfig = function() {
		$scope.config = configService.init();
	};

	$scope.getPosition = function() {
		$scope.page = configService.position($scope.config, $location.path());
	};


	init();

};

module.exports = rootController;