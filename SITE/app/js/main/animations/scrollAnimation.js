'use strict';

/* scrollAnimation */


var scrollAnimation = function( $window, ScrollManagerService ) {
	var animation = {};

	var transition = 1.5;
	var delay = transition / 3;

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
			TweenMax.to(elem, transition / 2, {y:0, delay: delay, ease: Power1.easeOut, onComplete: function(){
				done();
				ScrollManagerService.setDirection('down');
			}});
		}
		// go down
		else if ( ScrollManagerService.direction === 'down' )
		{
			TweenMax.set(elem, {y: -height});
			TweenMax.to(elem, transition / 2, {y:0, delay: delay, ease: Power1.easeOut, onComplete: function(){
				done();
				ScrollManagerService.setDirection('up');
			}});
		}

		// go left
		else if ( ScrollManagerService.direction === 'left' )
		{
			TweenMax.set(elem, {x: width});
			TweenMax.to(elem, transition / 2, { x:0, delay: delay, ease: Power1.easeOut, onComplete: function(){
				done();
				ScrollManagerService.setDirection('right');
			}});
		}
		// go right
		else if ( ScrollManagerService.direction === 'right' )
		{
			TweenMax.set(elem, {x: -width});
			TweenMax.to(elem, transition / 2, { x:0, delay: delay, ease: Power1.easeOut, onComplete: function(){
				done();
				ScrollManagerService.setDirection('left');
			}});
		}
	};

	animation.leave = function (elem, done) {

		// First Arrival
		if ( typeof ScrollManagerService.direction === 'undefined' )
		{
			ScrollManagerService.setDirection('right');
		}

		var height = $window.innerHeight;
		var width = $window.innerWidth;

		// go up
		if ( ScrollManagerService.direction === 'up' )
		{
			TweenMax.set(elem, {y: 0});
			TweenMax.to(elem, transition / 2, {y: -height, ease: Power1.easeIn, onComplete: function(){
				done();
				ScrollManagerService.setDirection('down');
			}});
		}
		// go down
		else if ( ScrollManagerService.direction === 'down' )
		{
			TweenMax.set(elem, {y: 0});
			TweenMax.to(elem, transition / 2, {y: height, ease: Power1.easeIn, onComplete: function(){
				done();
				ScrollManagerService.setDirection('up');
			}});
		}

		// go left
		else if ( ScrollManagerService.direction === 'left' )
		{
			TweenMax.set(elem, {x: 0});
			TweenMax.to(elem, transition / 2, { x:-width, delay: delay, ease: Power1.easeOut, onComplete: function(){
				done();
				ScrollManagerService.setDirection('right');
			}});
		}
		// go right
		else if ( ScrollManagerService.direction === 'right' )
		{
			TweenMax.set(elem, {x: 0});
			TweenMax.to(elem, transition / 2, { x:width, delay: delay, ease: Power1.easeOut, onComplete: function(){
				done();
				ScrollManagerService.setDirection('left');
			}});
		}

	};

	return animation;	
};

module.exports = scrollAnimation;