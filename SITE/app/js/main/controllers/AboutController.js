'use strict';

/* aboutController */

var aboutController = function($scope) {

	this.init = function() {

		$scope.target = $scope.config.data.main + $scope.config.data.targetForm;

		$scope.message = {
			name: '',
			mail: '',
			message: ''
		};
	};

	$scope.send = function() {

		if ($scope.messageForm.$invalid === true)
			return;
		console.log($scope.message)

		var request = $http.post($scope.target , null, $scope.message);

		request.success(
			function(data) {
				alert('rise like a phoenix');
				console.log(data);
			}
		);
		request.error(
			function(data) {
				alert('fall like a potatoe mash');
			}
		);

	};

	this.init();
};

module.exports = aboutController;
