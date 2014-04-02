'use strict';

app.controller('VotingModalController', ['$scope', '$state', '$modalInstance', function($scope, $state, $modalInstance) {

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
}]);
