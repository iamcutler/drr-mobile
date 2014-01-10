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
    // Watch dirty girl scope for changes
    $scope.$watch('dirty_girls', function() {
      // Find dirty girl by id and assign to scope
      if($scope.dirty_girls !== undefined) {
        $scope.dirty_girl = DirtyGirls.find_by_id($stateParams, $scope.dirty_girls);
      }
    });
  }
});
