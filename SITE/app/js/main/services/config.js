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

	service.position = function(config, location) {
		for ( var i = 0 ; i < config.flow.length ; i++ )
		{
			if ( location === config.flow[i].path ) {
				return {
					current: config.flow[i],
					previous: config.flow[i-1],
					next: config.flow[i+1]
				};
			}
		}
	};

	return service;
};

module.exports = configService;