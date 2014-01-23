'use strict';

app.controller('UserController', function ($scope, $state) {
  // Account settings
  if($state.current.name = "account-settings") {
    $scope.title = "Account Settings";
  }
});
