'use strict';

app.controller('GroupController', function ($scope, $state, $stateParams, $location, group) {

  // Find group by id
  if($state.current.name == "group") {
    $scope.title = group.name.substr(0, 50);
    $scope.group = group;
    // Format group timestamp created to utc local
    $scope.group.created = moment.utc($scope.group.created).local();
  }
});
