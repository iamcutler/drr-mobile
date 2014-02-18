'use strict';

app.controller('EventsController', function ($scope, $state, EventService, AuthService, ActivityService, event) {
  if($state.current.name = "event") {
    $scope.title = event.event.title;
    $scope.event = event;
    $scope.busy = false;
    $scope.activity_counter = 10;
    $scope.new_activity = {
      event_id: event.event.id,
      actor: AuthService.current_user().id,
      app: 'events.wall'
    };
    // Format group timestamp created to utc local
    $scope.event.event.start_date = new Date($scope.event.event.start_date);
    $scope.event.event.end_date = new Date($scope.event.event.end_date);
    $scope.event.event.created = new Date($scope.event.event.created);

    var formatDateTimeUTC = function(scope) {

      angular.forEach(scope, function(value, key) {
        value.created = moment.utc(value.created).local();
        angular.forEach(value.comments, function(v, k) {
          v.created = moment.utc(v.created).local();
        });
      });
    };

    // Format feed dates
    formatDateTimeUTC($scope.event.activity);

    $scope.is = {
      // Check if current user is a attaining member of the event
      member: function() {
        var member = false;
        angular.forEach($scope.event.event.members, function(value, key) {
          if(value.id == AuthService.current_user().id) {
            member = true;
          }
        });

        return member;
      },
      attending: function() {
        var status = false;

        angular.forEach($scope.event.event.members, function(value, key) {
          if(value.id == AuthService.current_user().id && value.status == 1) {
            status = true;
          }
        });

        return status;
      },
      // Check if currect user is an admin
      admin: function() {
        var admin = false;
        angular.forEach($scope.event.event.members, function(value, key) {
          if(value.id == AuthService.current_user().id && value.permission == 1) {
            admin = true;
          }
        });

        return admin;
      }
    };

    // Infinite scrolling function
    $scope.feed = {
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
      },
      new: function(form) {
        if(form.$valid) {
          var new_activity = ActivityService.new($scope.new_activity);

          new_activity.then(function(response) {
            $scope.new_activity.message = '';
            $scope.event.activity.unshift(response.activity[0]);
            formatDateTimeUTC($scope.event.activity);
          }, function() {});
        }
      }
    };
  }

  // Find Events
  if($state.current.name = "search-events") {
    $scope.title = "Find Upcoming Events";
  }
});