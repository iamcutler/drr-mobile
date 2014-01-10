'use strict';

app.controller("ApplicationController", function($scope, $state, $cookieStore, cdnDomain, AuthService) {
  // Set CDN host in app scope
  $scope.cdnDomain = cdnDomain;

  // Check user access throughout the application and redirect if wrong privileges
  AuthService.check_user_access();

  // Current user
  $scope.current_user = AuthService.current_user();
});