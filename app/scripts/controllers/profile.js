'use strict';

app.controller('ProfileController', function ($scope, $state, $stateParams, $location, $modal, AuthService, ProfileService, WallService, profile, content) {
  // Call profile service
  $scope.profile = profile;

  var formatMediaDatetime = function(scope) {
    scope.created = moment.utc(scope.created).local();
    angular.forEach(scope.comments, function(value, key) {
      scope.comments[key].date = moment.utc(scope.comments[key].date).local();
    });
  };

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

  // Video page
  if($state.current.name == "profile.video") {
    $scope.title = 'Video';
    $scope.video = content;

    $scope.new_comment = {
      cid: $scope.video.id,
      app: $scope.video.comment_type,
      user: AuthService.current_user().id
    };

    // Format momentJS
    formatMediaDatetime($scope.video);
  }

  // Photo page
  if($state.current.name == "profile.photo") {
    $scope.title = "Photo";
    $scope.photo = content;

    // If photo is emtpy, go back in history
    if(content.length == 0) {
      window.history.back();
    }

    $scope.new_comment = {
      cid: $scope.photo.id,
      app: $scope.photo.comment_type,
      user: AuthService.current_user().id
    };

    // Format momentJS
    formatMediaDatetime($scope.photo);
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

  // Compose new comments/wall resource
  $scope.composeComment = function(form, scope, comment) {
    if(form.$valid) {
      var new_activity = WallService.save(comment);

      new_activity.then(function(response) {
        if(response.result) {
          // Add new comment to scope
          scope.unshift({
            id: response.wall.id,
            type: response.wall.type,
            comment: response.wall.comment,
            date: moment.utc(response.wall.date).local(),
            stats: {
              likes: 0,
              dislikes: 0
            },
            user: {
              id: response.wall.user.id,
              name: response.wall.user.name,
              thumbnail: response.wall.user.thumbnail,
              avatar: response.wall.user.avatar,
              slug: response.wall.user.slug
            }
          });

          comment.comment = '';
        }
        console.log(response);
      }, function(response) {
        console.error(response);
      });
    }
  }
});
