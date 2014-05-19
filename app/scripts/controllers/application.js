'use strict';

app.controller("ApplicationController", ['$scope', '$state', '$cookies', '$timeout', 'endPoint', 'imgPlaceholder', 'environment', 'AuthService',
  function($scope, $state, $cookies, $timeout, endPoint, imgPlaceholder, environment, AuthService) {
  // Set constants in app scope
  $scope.cdnDomain = endPoint.cdn;
  $scope.drrDomain = endPoint.drr;
  $scope.imgPlaceholder = imgPlaceholder;
  $scope.environment = environment;
  $scope.endPoint = endPoint;

  // Check user access throughout the application and redirect if wrong privileges
  AuthService.check_user_access();

  // Current user
  $scope.current_user = AuthService.current_user();

  // CSRF Token for restricting access to app
  $cookies["XSRF-TOKEN"] = "my_token";

  // Welcome page for app launch
  if($state.current.name == "welcome") {
    $scope.title = "Welcome";
  }

  // Error Notifications
  // Send in a message object
  $scope.appErrors = [];
  $scope.$watchCollection('appErrors', function(newVal, oldVal) {
    $timeout(function() {
      $scope.appErrors = [];
    }, 3000);
  });

  // Detect mobile and redirect in production
  (function(a, b) {
    if($scope.environment == "production" && !a.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
      window.location = b;
    }
  })(navigator.userAgent, 'http://www.dirtyrottenrides.com');
}]);

// Init function to initializing application
var appinit = function() {
  if(document.cookie.indexOf('user_hash') < 0 && window.location.pathname != '/login') {
    window.location.href = "/#/login";
  }
};