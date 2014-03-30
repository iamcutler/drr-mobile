'use strict';

app.controller('VotingController', ['$scope', '$state', '$location', 'votes', function($scope, $state, $location, votes) {
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

  if($state.current.name == "vote-results") {
    $scope.title = "Current Poll Results";
    // Call dirty girls voting service
    $scope.voting = votes;

    $scope.$watch('voting', function() {
      if($scope.voting.length == 0) {
        $location.path('/vote');
      }
    });

    $scope.predicate = '-votes';
  }
}]);
