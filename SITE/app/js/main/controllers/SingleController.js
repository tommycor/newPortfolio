'use strict';

/* singleController */

var singleController = function($scope, $location, $routeParams) {

	this.init = function() {

		this.images = ['/../../img_examples/P8160006.jpg', '/../../img_examples/P8160021.jpg', '/../../img_examples/8160029_1.jpg'];

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
	};

	this.loaded = function() {

		if( this.img.height >= this.img.width)
			this.orientation = 'portrait';

		this.canvasRatio = this.canvasWidth / this.canvasHeight;
		this.imgRatio = this.img.width / this.img.height;

		this.newWidth = this.canvasWidth;
		this.newHeight = this.canvasHeight;

		if( this.canvasRatio > this.imgRatio ) {
			this.newHeight = Math.round(this.canvasWidth / this.imgRatio);
		}
		else{
			this.newWidth = Math.round(this.canvasHeight * this.imgRatio);
		}

		// drawImage(img, x, y, largeur, hauteur);
		// this.ctx.drawImage(this.img, 0, 0, this.canvasWidth, this.canvasHeight, 0, 0, this.img.width, this.img.height);
		this.ctx.drawImage(this.img, 0, 0, this.canvasWidth, this.canvasHeight);
	};

	this.loaded = this.loaded.bind(this);
	$scope.$on('canvasLoaded', this.loaded);

	this.init();
};

module.exports = singleController;
