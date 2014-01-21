'use strict';

app.controller('DirtyGirlsController', function ($scope, $state, $stateParams, DirtyGirlsService) {
  // Call to service to fetch data
  DirtyGirlsService.get_dirty_girls(function(data) {
    $scope.dirty_girls = data;
  });

  // Dirty Girls
  if($state.current.name == "dirty-girls") {
    $scope.title = "Dirty Girls";
  }

  // Dirty girl page
  if($state.current.name == "dirty-girl-page") {
    // Call dirty girl service to fetch dirty girl data
    DirtyGirlsService.find_by_id($stateParams.id, function(data) {
      $scope.title = data.name;
      $scope.dirty_girl = data;
    });
  }
});
