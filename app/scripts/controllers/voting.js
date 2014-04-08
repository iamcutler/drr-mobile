'use strict';

app.controller('VotingController', ['$scope', '$state', '$location', '$modal', 'VotingService', 'votes',
  function($scope, $state, $location, $modal, VotingService, votes) {

  // Voting
  if($state.current.name == "vote") {
    // Call dirty girls voting service
    var timer = VotingService.get_vote_timestamp();

    $scope.voting = votes;
    $scope.previousCastedVote = false;

    // Check if user already voted
    if(timer !== undefined) {
      $scope.elapedTime = Math.abs( new Date().getTime() - new Date(timer).getTime() ) / 3600000;
      // Check if time is longer than allowed period
      // If so, allow to vote, if not, slow modal
      if($scope.voting.poll.voting_period > $scope.elapedTime) {
        $scope.previousCastedVote = true;
      }
    }

    // Show modal if already voted in time period
    if($scope.previousCastedVote) {
      var votedModalInstance = $modal.open({
        controller: 'VotingModalController',
        templateUrl: '/views/shared-partials/vote-timestamp.modal.html',
        backdrop: 'static',
        keyboard: false
      });
    }

    // Enlarge voter details
    $scope.enlargeContestant = function(contestant) {
      $modal.open({
        controller: 'VotingModalController',
        templateUrl: '/views/voting/contestant.modal.html',
        resolve: {
          contestant: function() {
            return contestant;
          }
        }
      });
    };

    $scope.$watch('voting', function() {
      if($scope.voting.length != 0) {
        $scope.title = 'Vote Now';
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
