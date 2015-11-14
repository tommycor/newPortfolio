'use strict';

/* scollManager */


var configService = function() {
	var service = {};

	// General configuration for project
	service.init = function() {
		
		var config = {
			flow: [
				{
					name: 'home',
					path: '/',
					order: 0,
					veil: ''
				},
				{
					name: 'projects',
					path: '/projects',
					order: 1,
					veil: 'is--active'
				},
				{
					name: 'about',
					path: '/about',
					order: 2,
					veil: ''
				}
			],
			UI: {
				wheelThrottle: 2000,
				sliderDelay: 5000
			},
			data: {
				main: 'http://local.dev/',
				posts: 'wordpress/wp-json/posts'
			}
		};

		return config;
	};

	// Return position in the main flown (home -> projects -> about)
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