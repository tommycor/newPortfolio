'use strict';

/* scollManager */


var configService = function() {
	var service = {};

	service.init = function() {
		
		var config = {
			flow: [
				{
					name: 'home',
					path: '/',
					order: 0
				},
				{
					name: 'projects',
					path: '/projects',
					order: 1
				},
				{
					name: 'about',
					path: '/about',
					order: 2
				}
			]
		};

		return config;
	};

	return service;
};

module.exports = configService;