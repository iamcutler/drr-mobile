'use strict';

app.controller('EventsController', function ($scope, $state) {
  // Find Events
  if($state.current.name = "search-events") {
    $scope.title = "Find Upcoming Events";
  }
});