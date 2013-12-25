'use strict';

app.controller('VotingController', function ($scope, $state) {
  // Voting
  if($state.current.name == "vote") {
    $scope.title = "Vote for Januarys Dirty Girl!";
  }
});
