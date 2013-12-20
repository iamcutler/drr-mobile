'use strict';

app.controller('RequestsController', function ($scope, $state) {
  // Friend Requests
  if($state.current.name == "friend-requests") {
    $scope.title = "Friend Requests";
  }
});
