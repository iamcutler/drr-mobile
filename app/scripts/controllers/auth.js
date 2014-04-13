'use strict';

app.controller('AuthController', ['$scope', '$state', '$location', '$cookieStore', 'AuthService', function($scope, $state, $location, $cookieStore, AuthService) {
  // Registration
  if($state.current.name == "registeration") {
    $scope.register = {};
    $scope.registerSubmitted = false;
    $scope.registerErrorState = false;
    $scope.registerErrors = {};
    $scope.usernameTaken = false;

    // Watch desired username and call username unique service
    $scope.check_username_uniqueness = function() {
      console.log('check username');
      AuthService.check_username_uniqueness($scope.register.username, function(data) {
        if(data.unique) {
          $scope.usernameTaken = false;

          $("input[name='username']").css({
            background: '#FFF',
            color: '#555'
          });
        } else {
          $scope.usernameTaken = true;

          $("input[name='username']").css({
            background: '#F00',
            color: '#000'
          });
        }
      });
    }

    // Process registartion
    $scope.processRegistration = function(form) {
      $scope.registerSubmitted = true;

      // If form is valid, call auth register service
      if(form.$valid) {
        AuthService.register($scope.register, function(data) {
          if(data.status) {
            $scope.registerErrorState = false;

            // Save user data in cookie
            AuthService.set_user_session(data);

            // Successful redirect to user feed
            $location.path('/welcome');
          } else {
            $scope.registerErrorState = true;

            $scope.registerErrors = {};
            // Loop through and add error messages to scope
            angular.forEach(data.message, function(val, key) {
              $scope.registerErrors[key] = val;
            });
          }
        });
      }
    }
  }

  // Login
  if($state.current.name == "login") {
    $scope.login = {};
    $scope.loginSubmitted = false;
    $scope.loginError = '';

    $scope.processLogin = function(form) {
      // If form is valid, call auth login service
      if(form.$valid) {
        var submitBtn = $("form[name='" + form.$name + "'] button[type='submit']");

        // Disable submit button to avoid duplicate submissions
        submitBtn.prop('disabled', true);

        AuthService.login($scope.login, function(data) {
          if(data.status) {
            // Set user session and redirect to user feed
            AuthService.set_user_session(data.user);
            $location.path('/welcome');
          } else {
            $scope.loginError = 'wrong username and/or password. please try again.';

            // Enable submit button
            submitBtn.prop('disabled', false);
          }
        });
      } else {
        $scope.loginSubmitted = true;
        // Enable submit button
        submitBtn.prop('disabled', false);
      }
    }
  }

  // Logout
  if($state.current.name == "logout") {
    AuthService.clear_user_session();
    AuthService.logout();
  }
}]);
