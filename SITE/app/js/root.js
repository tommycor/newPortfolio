'use strict';

/* homeController */


var rootController = function($scope, $location, $interval, $window, ScrollManagerService, configService) {

	var init = function() {
		console.log('root');
		$scope.setConfig();
		$scope.getPosition();
	};

	$scope.goto = function (dest) {

		$scope.$apply(function() {
			$location.path(dest);
		});
		
		$scope.getPosition();
	};

	$scope.mousewheel = function (event) {
		var delta = event.deltaY;
		event.preventDefault();

		if ( delta > 0 ) {
			if ( typeof $scope.page.next !== 'undefined' )
				$scope.goto($scope.page.next.path);
		}
		else {
			if ( typeof $scope.page.previous !== 'undefined' )
				$scope.goto($scope.page.previous.path);
		}

	}

	$scope.setConfig = function() {
		$scope.config = configService.init();
	}

	$scope.getPosition = function() {

		for ( var i = 0 ; i < $scope.config.flow.length ; i++ )
		{
			if ( $location.path() === $scope.config.flow[i].path ) {
				$scope.page = {
					current: $scope.config.flow[i],
					previous: $scope.config.flow[i-1],
					next: $scope.config.flow[i+1]
				};
			}
		}
	};

	
	// $window.addEventListener('mousewheel', $scope.mousewheel);
	$window.addEventListener('mousewheel', throttle($scope.mousewheel, 1600, {
		trailing: false
	}));

	init();

};

module.exports = rootController;