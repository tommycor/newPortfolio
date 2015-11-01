'use strict';

// Requier all controlers
var rootController = require('./root.js');
var HomeController = require('./main/controllers/HomeController');
var ProjectsController = require('./main/controllers/ProjectsController');
var SingleController = require('./main/controllers/SingleController');
var AboutController = require('./main/controllers/AboutController');

// requier services
var configService = require('./main/services/config');
var ScollManagerService = require('./main/services/scrollManager');

// requier animations
var scrollAnimation = require('./main/animations/scrollAnimation');

var myApp = angular.module('app', ['ngRoute', 'ngAnimate', 'main']);

myApp.config(function($routeProvider, $locationProvider, $sceDelegateProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController'
		});
		$routeProvider.when('/projects', {
			templateUrl: 'partials/projects.html',
			controller: 'ProjectsController'
		});
		$routeProvider.when('/projects/:slug', {
			templateUrl: 'partials/single.html',
			controller: 'SingleController'
		});
		$routeProvider.when('/about', {
			templateUrl: 'partials/about.html',
			controller: 'AboutController'
		});
		$routeProvider.otherwise({
			redirectTo: '/'
		});

		// $locationProvider.html5Mode(true);
	});

// Setting myApp
myApp.service('configService', [configService]);
myApp.service('ScrollManagerService', ['$location', ScollManagerService]);
myApp.animation('.scrollAnimation', ['$window', 'ScrollManagerService', scrollAnimation]);
myApp.controller('RootController', ['$scope', '$location', '$interval', '$window', 'ScrollManagerService', 'configService', rootController]);

// creating main Module
var main = angular.module('main', []);

// Setting main module
main.controller('HomeController', ['$scope', '$location', HomeController]);
main.controller('ProjectsController', ['$scope', '$location', ProjectsController]);
main.controller('SingleController', ['$scope', '$location', '$routeParams', SingleController]);
main.controller('AboutController', ['$scope', '$location', AboutController]);
