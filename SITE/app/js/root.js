'use strict';

/* homeController */


var rootController = function($scope, $location, $interval, $window, ScrollManagerService, configService) {

	var init = function() {
		console.log('root');
		$scope.setConfig();
		$scope.getPosition();
		// $scope.transition = 'up';
	};

	$scope.goto = function (dest) {
		$scope.getPosition();

		$scope.$apply(function() {
			$location.path(dest);
		});
		
		$scope.getPosition();
	};

	$scope.mousewheel = function (event) {
		$scope.getPosition();

		event.preventDefault();
		
		var delta = event.deltaY;

		if ( delta > 0 ) {
			if ( typeof $scope.page.next !== 'undefined' ) {	
				$scope.transition = 'up';
				$scope.goto($scope.page.next.path);
			}
		}
		else {
			if ( typeof $scope.page.previous !== 'undefined' ) {
				$scope.transition = 'down';
				$scope.goto($scope.page.previous.path);
			}
		}
	};

	$scope.setConfig = function() {
		$scope.config = configService.init();
	};

	$scope.getPosition = function() {
		$scope.page = configService.position($scope.config, $location.path());

		// for ( var i = 0 ; i < $scope.config.flow.length ; i++ )
		// {
		// 	if ( $location.path() === $scope.config.flow[i].path ) {
		// 		$scope.page = {
		// 			current: $scope.config.flow[i],
		// 			previous: $scope.config.flow[i-1],
		// 			next: $scope.config.flow[i+1]
		// 		};
		// 	}
		// }
	};

	
	// $window.addEventListener('mousewheel', $scope.mousewheel);
	$window.addEventListener('mousewheel', throttle($scope.mousewheel, 2000, {
		trailing: false
	}));

	init();

};

module.exports = rootController;