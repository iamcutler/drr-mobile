'use strict';

app.controller('ProfileController', function ($scope, $state, $stateParams, $location, ProfileService) {
  // Call profile service
  ProfileService.getProfileData($stateParams, function(data) {
    if(data === undefined) {
      // Redirect to 404 profile view if error or not found
      $location.path("/error/profile/404");
    } else {
      // Assign data to profile scope
      $scope.profile = data;
    }
  });

  // Check for current profile state
  if($state.current.name == "profile") {
    // Watch for the profile service and update title scope
    $scope.$watch('profile', function() {
      $scope.title = $scope.profile.user.name;
    });
  }

  // About
  if($state.current.name == "profile-about") {

  }

  // Friends
  if($state.current.name == "profile-friends") {
    $scope.title = "iamcutler friends";
  }
  
  // Albums
  if($state.current.name == "profile-albums") {
    $scope.title = "iamcutler albums";
  }

  // Photos
  if($state.current.name == "profile-photos") {
    $scope.title = "iamcutler photos";
  }

  // Videos
  if($state.current.name == "profile-videos") {

  }

  // Events
  if($state.current.name == "profile-events") {

  }

  // Groups
  if($state.current.name == "profile-groups") {

  }
});
