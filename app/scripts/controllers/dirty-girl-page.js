'use strict';

app.controller('DirtyGirlPageCtrl', ['$scope', '$modalInstance', 'endPoint', function ($scope, $modalInstance, endPoint) {
  // Endpoint constant
  $scope.endPoint = endPoint;

  // Close modal
  $scope.close = function() {
    $modalInstance.dismiss('Close dirty girl page');
  };
}]);
