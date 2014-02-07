'use strict';

app.controller('ProfileController', function ($scope, $state, $stateParams, $location, profile, content) {
  // Call profile service
  $scope.profile = profile;

  // Check for current profile state
  if($state.current.name == "profile") {
    // Watch for the profile service and update title scope
    $scope.$watch('profile', function() {
      $scope.title = $scope.profile.user.name;
    });
  }

  // About
  if($state.current.name == "profile-about") {
    $scope.title = "About" + $scope.profile.user.name;
  }

  // Friends
  if($state.current.name == "profile-friends") {
    $scope.title = $scope.profile.user.name + "'s friends";
  }
  
  // Albums
  if($state.current.name == "photo-albums") {
    $scope.title = $scope.profile.user.name + "'s albums";
    $scope.albums = content;
  }

  // Photos
  if($state.current.name == "album-photos") {
    $scope.title = content.name;
    $scope.photos = content;
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
