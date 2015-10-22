'use strict';

/* scollManager */


var scrollManagerService = function($location) {
	var service = {};

	service.test = function() {
		console.log('scollManager');
	};

	return service;
};

module.exports = scrollManagerService;