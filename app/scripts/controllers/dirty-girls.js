'use strict';

app.controller('DirtyGirlsController', function ($scope, $state) {
  // Dirty Girls
  if($state.current.name == "dirty-girls") {
    $scope.title = "Dirty Girls";
  }
});
