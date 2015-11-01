'use strict';

/* scrollAnimation */


var scrollAnimation = function( $window, ScrollManagerService ) {
	var animation = {};

	var transition = 1.5;

	animation.enter = function (elem, done) {

		// First Arrival
		if ( typeof ScrollManagerService.direction === 'undefined' )
		{
			TweenMax.set(elem, {opacity: 0});
			TweenMax.to(elem, 1, {delay:1, opacity: 1, onComplete: done});
		}

		var height = $window.innerHeight;
		var width = $window.innerWidth;

		// go up
		if ( ScrollManagerService.direction === 'up' )
		{
			TweenMax.set(elem, {y: height});
			TweenMax.to(elem, transition / 2, {y:0, onComplete: done});
		}
		// go down
		else if ( ScrollManagerService.direction === 'down' )
		{
			TweenMax.set(elem, {y: -height});
			TweenMax.to(elem, transition / 2, {y:0, onComplete: done});
		}
	};

	animation.leave = function (elem, done) {

		// First Arrival
		if ( typeof ScrollManagerService.direction === 'undefined' )
		{
			TweenMax.set(elem, {opacity: 0});
			TweenMax.to(elem, 1, {delay:1, opacity: 1, onComplete: done});
		}

		var height = $window.innerHeight;
		var width = $window.innerWidth;

		// go up
		if ( ScrollManagerService.direction === 'up' )
		{
			TweenMax.set(elem, {y: 0});
			TweenMax.to(elem, transition / 2, {y: -height, onComplete: done});
		}
		// go down
		else if ( ScrollManagerService.direction === 'down' )
		{
			TweenMax.set(elem, {y: 0});
			TweenMax.to(elem, transition / 2, {y: height, onComplete: done});
		}

	};

	return animation;	
};

module.exports = scrollAnimation;