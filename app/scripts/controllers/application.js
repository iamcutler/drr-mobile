'use strict';

app.controller("ApplicationController", function($scope, $state, $cookies, cdnDomain, imgPlaceholder, AuthService) {
  // Set constants in app scope
  $scope.cdnDomain = cdnDomain;
  $scope.imgPlaceholder = imgPlaceholder;

  // Check user access throughout the application and redirect if wrong privileges
  AuthService.check_user_access();

  // Current user
  $scope.current_user = AuthService.current_user();
});