'use strict';

app.controller('AuthController', function ($scope) {
  // Login
  if($state.current.name == "login") {
    $scope.login = {};
    $scope.loginSubmitted = false;
    $scope.loginError = '';

    $scope.processLogin = function(form) {
      // If form is valid, call auth login service
      if(form.$valid) {
        AuthService.login($scope.login, function(data) {
          if(data.status) {
            // Set user session and redirect to user feed
            AuthService.set_user_session(data.user);
            $location.path('/feed');
          } else {
            $scope.loginError = 'wrong username and/or password. please try again.';
          }
        });
      } else {
        $scope.loginSubmitted = true;
      }
    }
  }

  // Logout
  if($state.current.name == "logout") {
    AuthService.clear_user_session();
    AuthService.logout();
  }
});
