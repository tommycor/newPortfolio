'use strict';

/* scrollAnimation */


var scrollAnimation = function( $window, ScrollManagerService ) {
	var animation = {};

	animation.enter = function (elem, done) {

		// First Arrival
		if ( typeof ScrollManagerService.direction === 'undefined' )
			return;

		// go up
		if ( ScrollManagerService.direction === 'up' )
		{
			console.log('up')
		}
		// go down
		else if ( ScrollManagerService.direction === 'down' )
		{
			console.log('down');
		}

		var height = $window.innerHeight;
		var width = $window.innerWidth;

		// console.log(ScrollManagerService);
	};

	return animation;	
};

module.exports = scrollAnimation;