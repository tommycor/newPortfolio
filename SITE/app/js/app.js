'use strict';

var rootController = require('./root.js');
var HomeController = require('./main/controllers/HomeController');
var ProjectsController = require('./main/controllers/ProjectsController');
var SingleController = require('./main/controllers/SingleController');
var AboutController = require('./main/controllers/AboutController');

var configService = require('./main/services/config');
var ScollManagerService = require('./main/services/scrollManager');

var myApp = angular.module('app', ['ngRoute', 'main']);

myApp.config(function($routeProvider, $locationProvider, $sceDelegateProvider) {
		$routeProvider.when('/', { templateUrl: 'partials/home.html', controller: 'HomeController' });
		$routeProvider.when('/projects', { templateUrl: 'partials/projects.html', controller: 'ProjectsController' });
		$routeProvider.when('/projects/:slug', { templateUrl: 'partials/single.html', controller: 'SingleController' });
		$routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: 'AboutController' });
		$routeProvider.otherwise({ redirectTo: '/' });

		// $locationProvider.html5Mode(true);
	});

myApp.service('configService', [configService]);
myApp.service('ScrollManagerService', ['$location', ScollManagerService]);
myApp.controller('RootController', ['$scope', '$location', '$interval', '$window', 'ScrollManagerService', 'configService', rootController]);

var main = angular.module('main', []);

main.controller('HomeController', ['$scope', '$location', HomeController]);
main.controller('ProjectsController', ['$scope', '$location', ProjectsController]);
main.controller('SingleController', ['$scope', '$location', '$routeParams', SingleController]);
main.controller('AboutController', ['$scope', '$location', AboutController]);
