/* dataLoaderService */


var dataLoaderService = function($http) {
	var service = {};

	service.getPosts = function (url) {
		this.dataSuccess = this.dataSuccess.bind(this);
		this.dataFail = this.dataFail.bind(this);

		this.posts = url.main + url.posts;
		
		this.request = $http({method: 'GET', url: this.posts});

		this.results = this.request.success(this.dataSuccess);
		this.request.error(this.dataFail);

		return this.results;
	};

	service.dataSuccess = function(data) {
		return data;
	};

	service.dataFail = function(error) {
		console.log(error);
	};

	return service;
};

module.exports = dataLoaderService;