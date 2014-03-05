'use strict';

app.controller('ProfileController', function ($scope, $state, $stateParams, $location, $modal, profile, content) {
  // Call profile service
  $scope.profile = profile;

  // Check for current profile state
  if($state.current.name == "profile") {
    // Watch for the profile service and update title scope
    $scope.$watch('profile', function() {
      $scope.title = $scope.profile.user.name;
    });

    // New message modal
    $scope.newMessage = function() {
      $modal.open({
        templateUrl: 'views/messages/new-message.modal.html',
        controller: 'ModalController',
        scope: $scope,
        resolve: {
          user: function() {
            return $scope.profile.user;
          }
        }
      });
    };
  }

  // About
  if($state.current.name == "profile.about") {
    $scope.title = "About" + " " + $scope.profile.user.name;
  }

  // Friends
  if($state.current.name == "profile.friends") {
    $scope.title = $scope.profile.user.name + "'s friends";
    $scope.friends = content;
    $scope.nameLabel = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  }
  
  // Albums
  if($state.current.name == "profile.albums") {
    $scope.title = $scope.profile.user.name + "'s albums";
    $scope.albums = content;
  }

  // Photos
  if($state.current.name == "profile.albums.photos") {
    $scope.title = content.name;
    $scope.photos = content;

    // Redirect if private album only to self or correct owner
    if(content.permission == '40' && profile.relation.self != true || content.album_owner == false) {
      window.history.back();
    }
  }

  // Videos
  if($state.current.name == "profile.videos") {
    $scope.title = $scope.profile.user.name + "'s videos";
    $scope.videos = content;
  }

  // Events
  if($state.current.name == "profile.events") {
  }

  // Groups
  if($state.current.name == "profile.groups") {
    $scope.title = $scope.profile.user.name + "'s groups";
    $scope.groups = content;
  }
});
