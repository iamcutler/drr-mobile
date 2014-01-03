'use strict';

app.controller('DirtyGirlsController', function ($scope, $state, dirtyGirlsFactory) {
  // Dirty Girls
  if($state.current.name == "dirty-girls") {
    $scope.title = "Dirty Girls";
    // Call to service to fetch data
    dirtyGirlsFactory.get_dirty_girls(function(data) {
      $scope.dirty_girls = data;
    });
  }
});
