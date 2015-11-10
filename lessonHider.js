angular.module('directivePractice').directive('lessonHider', function() {

	return {
		templateUrl: "/lessonHider.html",
		restrict: 'E',
		scope: {
			lesson: '=',
			dayAlert: '&',
		},
		link: function(scopeDir, element, attrs) {
			//console.log(scope, element, attrs);
			scopeDir.getSchedule.then(function(res) {
				scopeDir.schedule = res.data;

				scopeDir.schedule.forEach(function(scheduleDay) {
					if (scheduleDay.lesson === scopeDir.lesson) {
						scopeDir.lesson = scopeDir.schedule.weekday;
						element.css('text-decoration', 'underline');
						return;
					}
				});
			});


		},
		controller: function($scope, lessonService) {
			$scope.getSchedule = lessonService.getSchedule();
		}

	};

});