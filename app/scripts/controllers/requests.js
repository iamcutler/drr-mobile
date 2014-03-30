'use strict';

app.controller('RequestsController', ['$scope', '$state', 'requests', function($scope, $state, requests) {
  // Friend Requests
  if($state.current.name == "friend-requests") {
    $scope.title = "Friend Requests";
    $scope.requests = requests;
  }
}]);
