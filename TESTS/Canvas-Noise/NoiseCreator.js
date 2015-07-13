window.onload = function() {
	var noise = new Noise(50, 200, 3);

	window.addEventListener('resize', noise.handleResize, false);

	window.addEventListener('mousemove', noise.mouseMouve, false);
};


var Noise = function (variation, color, step) {
	this.variation = variation;
	this.color = color;
	this.step = step;

	this.handleResize = this.handleResize.bind(this);
	this.mouseMouve = this.mouseMouve.bind(this);

	this.canvas = document.getElementById('canvas');
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;
	this.context = canvas.getContext("2d");

	this.canvas.style.width = this.canvasSizeX = this.screenWidth;
	this.canvas.style.height = this.canvasSizeY = this.screenHeight;

	this.canvas.width = this.canvasSizeX;
	this.canvas.height = this.canvasSizeY;

	this.maxDist = 500;


	this.canvasData = this.context.getImageData(0, 0, this.canvasSizeX, this.canvasSizeY);


	this.create();
};

Noise.prototype.create = function() {

	var current;
	var variable;

	// console.log(this.canvasSizeX * this.canvasSizeY)

	// for( i = 0 ; i < this.canvas.width * this.canvas.height * 4 ; i += 4 * this.step ) {
	// 	variable = this.color + ( ( Math.random() * this.variation ) - (this.variation / 2 ) ) ;

	// 	this.canvasData.data[i + 0] = this.canvasData.data[i + 1] = this.canvasData.data[i + 2] = variable;

	// 	this.canvasData.data[i + 3] = 255;
	// }

	
	for( y = 0 ; y < this.canvas.height ; y += this.step ) {
		for( x = 0 ; x < this.canvas.width ; x += this.step ) {

			variable = this.color + ( ( Math.random() * this.variation ) - (this.variation / 2 ) ) ;

			current =  ( y * this.canvas.width + x ) * 4  ;

			this.canvasData.data[current + 0] = this.canvasData.data[current + 1] = this.canvasData.data[current + 2] = variable;

			this.canvasData.data[current + 3] = 255;
		}
	}

	this.primaryCanvasData = this.canvasData.data;

	this.update();

};

Noise.prototype.update = function() {
	this.context.putImageData(this.canvasData, 0, 0);
};

Noise.prototype.mouseMouve = function(event) {
	var current;
	var dist;
	
	for( y = 0 ; y < this.canvas.height ; y += this.step ) {
		for( x = 0 ; x < this.canvas.width ; x += this.step ) {

			dist = distEvent(event, x, y);

			current =  ( y * this.canvas.width + x ) * 4  ;

			if( dist < this.maxDist ){

				this.canvasData.data[current + 0] = this.canvasData.data[current + 1] = this.canvasData.data[current + 2] = 2;

			}
			else{

				this.canvasData.data[current + 0] = this.canvasData.data[current + 1] = this.canvasData.data[current + 2] = this.primaryCanvasData[current];

			}

			// this.canvasData.data[current + 0] = this.canvasData.data[current + 1] = this.canvasData.data[current + 2] = 2;

			// this.canvasData.data[current + 3] = 255;
		}
	}

	this.update();

};

Noise.prototype.handleResize = function() {
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;

	
	this.canvas.style.width = this.context.canvas.width = this.canvasSizeX = this.screenWidth;
	this.canvas.style.height = this.context.canvas.height = this.canvasSizeY = this.screenHeight;

	this.canvasData = this.context.getImageData(0, 0, this.canvasSizeX, this.canvasSizeY);

	this.create();
};

function distEvent( event, x, y ) {
	var event = {
		x: event.clientX,
		y: event.clientY
	};

	return( ( event.x - x ) * ( event.x - x ) + ( event.y - y ) * ( event.y - y ) );
}