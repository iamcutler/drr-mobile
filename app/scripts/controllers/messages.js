'use strict';

app.controller('MessagesController', function ($scope, $state) {
  if($state.current.name == "messages") {
    $scope.title = "My Messages";
  }
});
