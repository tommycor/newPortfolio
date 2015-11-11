/* ImageLoaderService */


var ImageLoaderService = function($q) {
	var service = {};

	service.loadImages = function (imagesLocation) {
		this.loaderImage = this.loaderImage.bind(this);
		this.handleImageError = this.handleImageError.bind(this);

		this.imagesLocation = imagesLocation;

		this.deferred = $q.defer();
		this.promise = this.deferred.promise;

		this.imageCount = this.imagesLocation.length;
		this.loadCount = 0;
		this.errorCount = 0;

		this.img = [];

		this.states = {
			PENDING: 1,
			LOADING: 2,
			RESOLVED: 3,
			REJECTED: 4
		};

		// State of the preloader;
		this.state = this.states.PENDING;

		return ( this.load() );
	};

	service.load = function() {
		if ( this.isInitiated() )
			return( this.promise );

		this.state = this.states.LOADING;

		for ( var i = 0 ; i < this.imageCount ; i++ ) {
			this.loadImageLocation( this.imagesLocation[ i ], i );
		}

		return( this.promise );
	};

	service.loadImageLocation = function( imageLocation, index ) {
		this.img[index] = new Image();
		this.img[index].src = imageLocation;
		this.img[index].onload = this.loaderImage;
		this.img[index].onerror = this.handleImageError;
	};

	service.loaderImage = function( event ) {
		this.handleImageLoad();
	};

	service.handleImageLoad = function() {
		this.loadCount++;

		if (this.isRejected())
			return;

		if( this.loadCount === this.imageCount ){
			this.state = this.states.RESOLVED;

			this.deferred.resolve( this.img );
		}
	};

	service.handleImageError = function(event) {
		this.errorCount++;

		if (this.isRejected())
			return;

		this.state = this.states.REJECTED;

		this.deferred.reject( event.target.src );
	};


	service.isInitiated = function() {
		return (this.state !== this.states.PENDING);
	};

	service.isRejected = function isRejected() {
		return( this.state === this.states.REJECTED );
	};

	service.isResolved = function isResolved() {
		return( this.state === this.states.RESOLVED );
	};

	return service;
};

module.exports = ImageLoaderService;