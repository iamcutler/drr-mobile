'use strict';

app.controller('EventsController', function ($scope, $state, EventService, AuthService, event) {
  if($state.current.name = "event") {
    $scope.title = event.event.title;
    $scope.event = event;
    $scope.busy = false;
    $scope.activity_counter = 10;
    // Format group timestamp created to utc local
    $scope.event.event.start_date = new Date($scope.event.event.start_date);
    $scope.event.event.end_date = new Date($scope.event.event.end_date);
    $scope.event.event.created = new Date($scope.event.event.created);

    // Format feed dates
    angular.forEach($scope.event.activity, function(value, key) {
      moment.utc($scope.event.activity[key].created).local();
      angular.forEach(value.comments, function(v, k) {
        moment.utc(v.created).local();
      });
    });

    // Check if current user is a attaining member of the event
    $scope.isMember = function() {
      angular.forEach($scope.event.event.members, function(value, key) {
        if(value.id == AuthService.current_user().id && value.status == 1) {
          return true;
        }
      });

      return false;
    };

    // Infinite scrolling function
    $scope.feedLoader = {
      load: function() {
        var activity = EventService.activity($scope.event.event.id, $scope.activity_counter);

        activity.then(function(response) {
          angular.forEach(response, function(val, key) {
            $scope.event.activity.push(val);
          });
          if(response.length > 0) {
            $scope.activity_counter += 10;
          }
          $scope.busy = false;
        });
      }
    };
  }

  // Find Events
  if($state.current.name = "search-events") {
    $scope.title = "Find Upcoming Events";
  }
});