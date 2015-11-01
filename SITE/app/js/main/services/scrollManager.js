'use strict';

/* scollManager */


var scrollManagerService = function($location) {
	var service = {};
	this.direction = null;

	// Setter variable scrolling direction
	service.setDirection = function(dir) {
		this.direction = dir;
	};

	return service;
};

module.exports = scrollManagerService;