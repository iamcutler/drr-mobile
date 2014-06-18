'use strict';

app.controller('VotingModalController', ['$scope', '$state', '$modalInstance', 'vote', function($scope, $state, $modalInstance, vote) {
  // Voting contestant scope
  if($state.current.name === 'vote') {
    $scope.contestant = vote.contestant;
    $scope.poll = vote.poll;
    $scope.user = vote.user;
    $scope.cdnDomain = vote.cdnDomain;
  }

  // Close modal and show results
  $scope.viewResults = function() {
    $modalInstance.dismiss('close');
    $state.go('vote-results');
  };

  // Go back to previous
  $scope.goBack = function() {
    $modalInstance.dismiss('close');
    window.history.back();
  };

  // Close modal
  $scope.close = function() {
    $modalInstance.dismiss('close');
  };
}]);
