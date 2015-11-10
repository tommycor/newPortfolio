'use strict';

/* singleController */

var singleController = function($scope, $location, $routeParams) {

	this.init = function() {

		this.images = ['/../../img_examples/P8160006.jpg', '/../../img_examples/P8160021.jpg', '/../../img_examples/P8160029_1.jpg'];

		this.canvas = document.querySelector('#gallery');
		this.canvasJqLite = angular.element(this.canvas);
		this.ctx = this.canvas.getContext('2d');

		this.canvasWidth = this.canvas.offsetWidth;
		this.canvasHeight = this.canvas.offsetHeight;
		this.canvas.setAttribute('width', this.canvasWidth + "px");
		this.canvas.setAttribute('height', this.canvasHeight + "px");

		this.img = new Image();
		this.img.src = this.images[0];
		this.img.onload = function(){
			$scope.$emit('canvasLoaded');
		};

		this.canvas.addEventListener('click', this.scroll);
	};

	this.loaded = function() {

		this.canvasRatio = this.canvasWidth / this.canvasHeight;

		this.img.sHeight = this.img.width / this.canvasRatio;
		this.img.sy = ( this.img.height / 2 ) - ( this.img.sHeight / 2 );

		this.img.sWidth = this.img.width / 2;
		this.img.sX1 = 0;
		this.img.sX2 = this.img.sWidth;
		this.dWidth = this.canvasWidth / 2;
		this.dHeight = this.canvasHeight;
		this.dX1 = 0;
		this.dX2 = this.dWidth;
		this.img.dY1 = 0;
		this.img.dY2 = 0;

		TweenMax.ticker.addEventListener("tick", this.draw);
	};

	this.scroll = function(event) {
		TweenMax.to(this.img, 1, { dY1: -this.canvasHeight, ease: Power1.easeInOut } );
		TweenMax.to(this.img, 1, { dY2: this.canvasHeight, ease: Power1.easeInOut } );
	};

	this.draw = function() {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.ctx.drawImage(this.img, this.img.sX1, this.img.sy, this.img.sWidth, this.img.sHeight, this.dX1, this.img.dY1, this.dWidth, this.dHeight);
		this.ctx.drawImage(this.img, this.img.sX2, this.img.sy, this.img.sWidth, this.img.sHeight, this.dX2, this.img.dY2, this.dWidth, this.dHeight);
	};

	this.loaded = this.loaded.bind(this);
	this.draw = this.draw.bind(this);
	this.scroll = this.scroll.bind(this);
	$scope.$on('canvasLoaded', this.loaded);

	this.init();
};

module.exports = singleController;