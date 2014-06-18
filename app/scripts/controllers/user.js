'use strict';

app.controller('UserController', ['$scope', '$state', 'UserService', 'account', function($scope, $state, UserService, account) {
  // Account settings
  if($state.current.name === 'account-settings') {
    $scope.title = 'Account Settings';
    $scope.settings = account;
    $scope.perferences = {};
    $scope.submitSuccess = false;

    // Save account preferences
    $scope.saveSettings = function(form) {
      if(form.$valid) {
        // Disable button to avoid double clicking
        $('button').prop('disabled', true);

        // Assign values to perferences scope
        angular.forEach($scope.settings, function(val, key) {
          $scope.perferences[key] = {
            id: val.id,
            value: val.value.value,
            access: val.value.access
          };
        });

        var update = UserService.update_account_settings($scope.perferences);

        update.then(function(response) {
          $scope.submitSuccess = true;
          $('button').prop('disabled', false);
          console.log(response);

          if(response.status) {
            $scope.statusMsg = 'Successfully saved account perferences.';
          } else {
            $scope.statusMsg = 'Error saving account perferences.';
          }
        });
      }
    };
  }
}]);
