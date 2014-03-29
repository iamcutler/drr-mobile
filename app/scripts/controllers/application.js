'use strict';

app.controller("ApplicationController", function($scope, $state, $cookies, endPoint, imgPlaceholder, AuthService) {
  // Set constants in app scope
  $scope.cdnDomain = endPoint.cdn;
  $scope.imgPlaceholder = imgPlaceholder;

  // Check user access throughout the application and redirect if wrong privileges
  AuthService.check_user_access();

  // Current user
  $scope.current_user = AuthService.current_user();

  // CSRF Token for restricting access to app
  $cookies["XSRF-TOKEN"] = "my_token";
});