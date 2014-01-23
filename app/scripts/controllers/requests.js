'use strict';

app.controller('RequestsController', function ($scope, $state, requests) {
  // Friend Requests
  if($state.current.name == "friend-requests") {
    $scope.title = "Friend Requests";
    $scope.requests = requests;
  }
});
