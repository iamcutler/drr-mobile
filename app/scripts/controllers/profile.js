'use strict';

app.controller('ProfileController', function ($scope, $state, $stateParams, $location, $modal, ProfileService, profile, content) {
  // Call profile service
  $scope.profile = profile;

  // Check for current profile state
  if($state.current.name == "profile") {
    $scope.title = $scope.profile.user.name;
    $scope.feedCounter = 10;
    $scope.disabledScroll = false;
    $scope.busy = false;

    // Convert feed times to momentKS
    angular.forEach($scope.profile.profile.feed, function(value, key) {
      $scope.profile.profile.feed[key].created = moment.utc($scope.profile.profile.feed[key].created).local();
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

    // Feed object
    $scope.feed = {
      load: function() {
        if(!$scope.disabledScroll && !$scope.busy) {
          // Busy disables scrolling && shows/hides loader.
          $scope.busy = true;

          // Call feed function property in profile service
          var feed = ProfileService.feed($stateParams.slug, $scope.feedCounter);

          feed.then(function(response) {
            if(response.length > 0) {
              // Loop results and bind to feed collection
              angular.forEach(response, function(value, key) {
                $scope.profile.profile.feed.push(value);
              });

              $scope.feedCounter += 10;
            } else {
              $scope.disabledScroll = true;
            }

            $scope.busy = false;
          }, function(error) {
            console.error(error);
          });
        }
      }
    };
  }

  // About
  if($state.current.name == "profile.about") {
    $scope.title = "About" + " " + $scope.profile.user.name;
    $scope.about_user = content;
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
    $scope.title = $scope.profile.user.name + "'s events";
    $scope.events = content;
  }

  // Groups
  if($state.current.name == "profile.groups") {
    $scope.title = $scope.profile.user.name + "'s groups";
    $scope.groups = content;
  }
});
