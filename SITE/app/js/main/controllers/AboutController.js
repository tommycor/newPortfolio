'use strict';

/* aboutController */

var aboutController = function($scope, $http) {

	this.init = function() {

		$scope.target = $scope.config.data.main + $scope.config.data.targetForm;

		$scope.message = {
			name: '',
			mail: '',
			message: ''
		};

		$scope.confirm = null;
	};

	$scope.send = function() {

		if ($scope.messageForm.$invalid === true)
			return;


		var config = {
			params: {
				message: $scope.message
			}
		};

		var request = $http.post($scope.target, null, config);
		$scope.sent = 'true';

		request.success(
			function(data) {
				if(data === 'done')
					$scope.confirm = 'Message envoyé!';
				else
					$scope.confirm = 'Seems like serve is not liking something.';
			}
		);
		request.error(
			function() {
				alert('failed like a potatoe mash');
			}
		);

	};

	this.init();
};

module.exports = aboutController;
