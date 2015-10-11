'use strict';

var HomeController = require('./main/controllers/HomeController');
var ProjectsController = require('./main/controllers/ProjectsController');
var SingleController = require('./main/controllers/SingleController');
var AboutController = require('./main/controllers/AboutController');

angular.module('app', ['ngRoute', 'main']).
config(function($routeProvider, $sceDelegateProvider) {
	$routeProvider.when('/', { templateUrl: 'partials/home.html', controller: 'HomeController' });
	$routeProvider.when('/projects', { templateUrl: 'partials/projects.html', controller: 'ProjectsController' });
	$routeProvider.when('/projects/:slug', { templateUrl: 'partials/single.html', controller: 'SingleController' });
	$routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: 'AboutController' });
	$routeProvider.otherwise({ redirectTo: '/' });

	$sceDelegateProvider.resourceUrlWhitelist(['self']);
});

var main = angular.module('main', []);

main.controller('HomeController', ['$scope', '$location', HomeController]);
main.controller('ProjectsController', ['$scope', '$location', ProjectsController]);
main.controller('SingleController', ['$scope', '$location', '$routeParams', SingleController]);
main.controller('AboutController', ['$scope', '$location', AboutController]);
