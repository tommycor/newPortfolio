'use strict';

/* singleController */

var singleController = function($scope, $location, $routeParams, $window, $interval, ImageLoaderService) {

	this.init = function() {

		this.data = [];

		for( var i = 0 ; i < $scope.currentPost.meta.gallery.length ; i++) {
			this.data[i] = $scope.currentPost.meta.gallery[i].url;
		}




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
	};

	this.scroll = function() {

		$interval.cancel(this.interval);
		this.canvas.removeEventListener('click', this.scroll);

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
		this.interval = $interval(this.scroll, $scope.config.UI.sliderDelay, 0);
		this.canvas.addEventListener('click', this.scroll);

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





	var Noise = function (variation, color, step, maxColor) {
		this.variation = variation;
		this.color = color;
		this.step = step;
		this.maxColor = maxColor;

		this.handleResize = this.handleResize.bind(this);
		this.mouseMouve = this.mouseMouve.bind(this);


		this.canvas = document.querySelector('#noiseCanvas');
		this.container = document.querySelector('#containerCanvas');
		this.context = this.canvas.getContext('2d');

		this.canvasWidth = this.container.offsetWidth;
		this.canvasHeight = this.container.offsetHeight;
		this.canvas.setAttribute('width', this.canvasWidth + 'px');
		this.canvas.setAttribute('height', this.canvasHeight + 'px');
		this.canvas.top = this.canvas.getBoundingClientRect().top;

		this.maxDist = 300000;
		this.originalCanvasData = [];

		this.canvasData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);


		this.init();
	};

	Noise.prototype.init = function() {

		var current;
		var variable;
		
		for( var y = 0 ; y < this.canvasHeight ; y += 1 ) {
			for( var x = 0 ; x < this.canvasWidth ; x += 1 ) {

				variable = this.color + ( ( Math.random() * this.variation ) - (this.variation / 2 ) ) ;

				current =  ( y * this.canvasWidth + x ) * 4  ;

				this.canvasData.data[current + 0] = this.canvasData.data[current + 1] = this.canvasData.data[current + 2] = variable;

				this.canvasData.data[current + 3] = 255;

				this.originalCanvasData[current] = variable;
			}
		}

		this.update();

	};

	Noise.prototype.update = function() {
		this.context.putImageData(this.canvasData, 0, 0);
	};

	Noise.prototype.mouseMouve = function(event) {

		var current;
		var dist;

		
		for(var y = 0 ; y < this.canvasHeight ; y += this.step ) {
			for(var x = 0 ; x < this.canvasWidth ; x += this.step ) {

				dist = distEvent(event, x, y, this.canvas.top);

				current =  ( y * this.canvasWidth + x ) * 4  ;

				if( dist < this.maxDist ){

					for( var i = 0 ; i < this.step ; i ++)
					{

						this.canvasData.data[current + ( i * 4 ) + 0] = this.canvasData.data[current + ( i * 4 ) + 1] = this.canvasData.data[current + ( i * 4 ) + 2] = this.maxColor - ( ( this.maxColor - this.originalCanvasData[current] ) / this.maxDist ) * dist;
						
					}


				}
				else{

					this.canvasData.data[current + 0] = this.canvasData.data[current + 1] = this.canvasData.data[current + 2] = this.originalCanvasData[current];

				}
			}
		}

		this.update();

	};

	Noise.prototype.handleResize = function() {

		this.canvasWidth = this.container.offsetWidth;
		this.canvasHeight = this.container.offsetHeight;
		this.canvas.setAttribute('width', this.canvasWidth + 'px');
		this.canvas.setAttribute('height', this.canvasHeight + 'px');
		this.canvas.top = this.canvas.getBoundingClientRect().top;

		this.canvasData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);

		this.init();
	};

	function distEvent( event, x, y, top ) {
		event = {
			x: event.clientX,
			y: event.clientY - top
		};

		return( ( event.x - x ) * ( event.x - x ) + ( event.y - y ) * ( event.y - y ) );
	}

	this.init();

	var noise = new Noise(30, 220, 2, 260);

	$window.addEventListener('resize', noise.handleResize, false);

	var isFirefox = typeof InstallTrigger !== 'undefined';
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	if(!isFirefox && !isIE)
		$window.addEventListener('mousemove', noise.mouseMouve, false);
};

module.exports = singleController;