'use strict';

app.controller('AuthController', ['$scope', '$state', '$location', '$cookieStore', 'AuthService', function($scope, $state, $location, $cookieStore, AuthService) {
  // Registration
  if($state.current.name == "registeration") {
    $scope.register = {};
    $scope.registerSubmitted = false;
    $scope.registerErrors = false;
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
            // Save user data in cookie
            AuthService.set_user_session(data);

            console.log('Registered user successfully');
            // Successful redirect to user feed
            $location.path('/feed');
          } else {
            $scope.registerErrors = true;
            $("div.alert.register-errors").html(data.message);
            console.log(data);
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
}]);
