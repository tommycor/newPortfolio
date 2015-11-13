'use strict';

/* homeController */


var rootController = function($scope, $location, $interval, $window, ScrollManagerService, configService, scrollAnimation) {

	var init = function() {
		console.log('root');
		$scope.setConfig();	
		$scope.getPosition();

		// General Listeners
		$window.addEventListener('wheel', throttle($scope.mousewheel, $scope.config.UI.wheelThrottle, {
			trailing: false
		}));
		$window.addEventListener('build', function(){
			var loader = document.getElementById('mainLoader');
			loader.className = loader.className + ' hide'
		});
	};

	// Goto fonction
	// receive destination path
	$scope.goto = function (dest){
		$scope.getPosition();

		$scope.$apply(function() {
			$location.path(dest);
		});
		
		$scope.getPosition();
	};

	$scope.gotoArrow = function (dest){
		$scope.getPosition();

		ScrollManagerService.setDirection('up');

		$location.path(dest);
		
		$scope.getPosition();
	};


	$scope.gotoProjects = function (project){
		$scope.getPosition();

		if( project === '')
			ScrollManagerService.setDirection('right');
		else
			ScrollManagerService.setDirection('left');

		$location.path('/projects/' + project);
		
		$scope.getPosition();
	};

	// Mousewheel function
	// receive mousewheel event
	$scope.mousewheel = function (event) {
		$scope.getPosition();

		event.preventDefault();

		console.log(event);
		
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

		if ( typeof $scope.page !== 'undefined' )
			if ( typeof $scope.page.current !== 'undefined' )
				$scope.veil = $scope.page.current.veil;
	};


	init();

};

module.exports = rootController;