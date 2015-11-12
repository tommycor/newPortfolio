'use strict';

/* singleController */

var singleController = function($scope, $location, $routeParams, $window, $interval, ImageLoaderService, configService) {

	this.init = function() {

		this.data = ['/../../img_examples/P8160006.jpg', '/../../img_examples/P8160021.jpg', '/../../img_examples/P8160029_1.jpg', '/../../img_examples/P8160021.jpg'];


		this.canvas = document.querySelector('#gallery');
		this.canvasJqLite = angular.element(this.canvas);
		this.container = document.querySelector('#container');
		this.ctx = this.canvas.getContext('2d');

		this.index = {};
		this.transition = false;
		this.nbrImages = this.data.length;

		this.canvas.addEventListener('click', this.scroll);

		ImageLoaderService.loadImages(this.data).then(
			this.loaded, 
			function handleReject( imageLocation ) {
				console.log('fail to load ' + imageLocation);
			}
		);
	};

	this.loaded = function(images) {
		this.images = images;

		this.resize();

		this.position();

		TweenMax.ticker.addEventListener('tick', this.draw);

		$scope.canvasLoaded = true;

		$interval(this.scroll, $scope.config.UI.sliderDelay, 0);
	};

	this.scroll = function(event) {
		TweenMax.to(this.images[this.index.current], 1, { dY1: -this.canvasHeight, ease: Power1.easeInOut } );
		TweenMax.to(this.images[this.index.current], 1, { dY2: this.canvasHeight, ease: Power1.easeInOut } );

		this.transition = true;

		// TweenMax.set(this.images[this.index.next], 1, { dY1: this.canvasHeight } );
		// TweenMax.set(this.images[this.index.next], 1, { dY2: -this.canvasHeight } );
		this.images[this.index.next].dY1 = this.canvasHeight;
		this.images[this.index.next].dY2 = -this.canvasHeight;
		TweenMax.to(this.images[this.index.next], 1, { dY1: 0, ease: Power1.easeInOut } );
		TweenMax.to(this.images[this.index.next], 1, { dY2: 0, ease: Power1.easeInOut, onComplete: this.position} );

	};

	this.draw = function() {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.ctx.drawImage(this.images[this.index.current], this.images[this.index.current].sX1, this.images[this.index.current].sy, this.images[this.index.current].sWidth, this.images[this.index.current].sHeight, this.dX1, this.images[this.index.current].dY1, this.dWidth, this.dHeight);
		this.ctx.drawImage(this.images[this.index.current], this.images[this.index.current].sX2, this.images[this.index.current].sy, this.images[this.index.current].sWidth, this.images[this.index.current].sHeight, this.dX2, this.images[this.index.current].dY2, this.dWidth, this.dHeight);

		if( this.transition ) {
			this.ctx.drawImage(this.images[this.index.next], this.images[this.index.next].sX1, this.images[this.index.next].sy, this.images[this.index.next].sWidth, this.images[this.index.next].sHeight, this.dX1, this.images[this.index.next].dY1, this.dWidth, this.dHeight);
			this.ctx.drawImage(this.images[this.index.next], this.images[this.index.next].sX2, this.images[this.index.next].sy, this.images[this.index.next].sWidth, this.images[this.index.next].sHeight, this.dX2, this.images[this.index.next].dY2, this.dWidth, this.dHeight);
		}

	};

	this.position = function() {
		this.transition = false;

		if( typeof this.index.current === 'undefined')
			this.index.current = 0;
		else{
			this.index.current = this.index.next;
		}

		this.index.next = this.index.current + 1;
		this.index.previous = this.index.current - 1;

		// si current vaut 0, previous vaut le dernier
		if( this.index.current === 0)
			this.index.previous = this.nbrImages - 1;
		// si current vaut le dernier, next vaut 0
		if( this.index.current === this.nbrImages - 1 )
			this.index.next = 0;
	};

	this.resize = function() {

		this.canvasWidth = this.container.offsetWidth;
		this.canvasHeight = this.container.offsetHeight;
		this.canvas.setAttribute('width', this.canvasWidth + "px");
		this.canvas.setAttribute('height', this.canvasHeight + "px");

		this.canvasRatio = this.canvasWidth / this.canvasHeight;
		this.dWidth = this.canvasWidth / 2;
		this.dHeight = this.canvasHeight;
		this.dX1 = 0;
		this.dX2 = this.dWidth;

		for ( var i = 0 ; i < this.nbrImages ; i++ ) {
			var img = this.images[i];

			img.sHeight = img.width / this.canvasRatio;
			img.sy = ( img.height / 2 ) - ( img.sHeight / 2 );

			img.sWidth = img.width / 2;
			img.sX1 = 0;
			img.sX2 = img.sWidth;
			img.dY1 = 0;
			img.dY2 = 0;
		}
	};

	this.loaded = this.loaded.bind(this);
	this.draw = this.draw.bind(this);
	this.position = this.position.bind(this);
	this.scroll = this.scroll.bind(this);
	this.resize = this.resize.bind(this);

	$window.addEventListener('resize', this.resize);

	this.init();
};

module.exports = singleController;