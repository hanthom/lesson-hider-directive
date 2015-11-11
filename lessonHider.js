angular.module('directivePractice').directive('lessonHider', function() {

	return {
		templateUrl: "/lessonHider.html",
		restrict: 'E',
		scope: {
			lesson: '=',
			dayAlert: '&',
			line: '='
		},
		link: function(scopeDir, element, attrs) {
			console.log(scopeDir, element, attrs);
			scopeDir.getSchedule.then(function(res) {
				scopeDir.schedule = res.data;
				var birdy = false;
				scopeDir.$watch('line', function(newCheck, old) {
					var decorator = newCheck && birdy ? 'line-through' : 'none';
					element.css('text-decoration', decorator);
				});

				scopeDir.schedule.forEach(function(scheduleDay) {
					if (scheduleDay.lesson === scopeDir.lesson) {
						console.log(scheduleDay);
						birdy = true;
						scopeDir.lessonDay = scheduleDay.weekday;
						element.css('text-decoration', 'line-through');
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