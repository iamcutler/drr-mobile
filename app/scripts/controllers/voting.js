'use strict';

app.controller('VotingController', function ($scope, $state, votes) {
  // Voting
  if($state.current.name == "vote") {
    // Call dirty girls voting service
    $scope.voting = votes;

    $scope.$watch('voting', function() {
      if($scope.voting.length != 0) {
        $scope.title = $scope.voting.poll.question;
      } else {
        $scope.title = 'Poll Coming Soon';
      }
    });
  }
});
