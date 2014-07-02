'use strict';
/*
 * These angular directives are based on user activity. ex: Feeds, likes, etc.
 */

app.directive('likeThis', ['LikeService', function(LikeService) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      element: '@',
      id: '@',
      like: '@'
    },
    replace: true,
    link: function(scope, elem, attrs) {
      var loaderClass;

      // On click, fetch data to assign correct likes
      elem.bind('click', function() {
        // Show loader based on button styling
        if(elem.hasClass('btn-default')) {
          loaderClass = 'default-sm';
        } else if(elem.hasClass('btn-primary')) {
          loaderClass = 'primary-sm';
        } else if(elem.hasClass('btn-liked')) {
          loaderClass = 'primary-sm';
        } else {
          loaderClass = 'default-sm';
        }

        // Disable like button and show loader
        elem.addClass('btn-loader').addClass(loaderClass).prop('disabled', true);

        var like = (scope.like == 1) ? LikeService.like(scope.element, scope.id) : LikeService.dislike(scope.element, scope.id);

        like.then(function(response) {
          // Update model scope binding
          scope.model.stats.likes = response.like.likes;
          // Update user liked status
          scope.model.stats.user.like = response.user.like;

          elem.removeClass('btn-loader').removeClass(loaderClass).prop('disabled', false);
        }, function(error) {
          console.error(error);
          elem.removeClass('btn-loader').removeClass(loaderClass).prop('disabled', false);
        });
      });
    }
  };
}]);

app.directive('eventAttendance', ['ActivityService', function(ActivityService) {
  return {
    restrict: 'A',
    scope: {
      target: '@'
    },
    link: function(scope, elem) {
      elem.bind('change', function() {
        //Update user attendance to this event
        ActivityService.event_attendance(scope.target);
      });
    }
  };
}]);

app.directive('removeActivity', ['ActivityService', function(ActivityService) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      index: '@',
      app: '@',
      target: '@'
    },
    link: function(scope, elem) {
      elem.bind('click', function() {
        if(confirm('Are you sure?')) {
          var remove = ActivityService.delete(scope.target, scope.app);

          remove.then(function() {
            scope.model.splice(scope.index, 1);
          }, function(response) {
            console.error(response);
          });
        }
      });
    }
  };
}]);

app.directive('removeWall', ['WallService', function(WallService) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      target: '@',
      index: '@'
    },
    link: function(scope, elem) {
      elem.bind('click', function() {
        if(confirm('Are you sure you want to remove this comment?')) {
          var remove = WallService.delete(scope.target);

          remove.then(function(response) {
            if(response.result) {
              scope.model.splice(scope.index, 1);
            }
          }, function(response) {
            console.error(response);
          });
        }
      });
    }
  };
}]);

app.directive('showMediaVideo', function() {
  return {
    restrict: 'A',
    scope: {
      mediaType: '@',
      showMediaVideo: '@',
      mediaId: '@'
    },
    link: function(scope, elem, attrs) {
      $(elem).bind('click', function() {
        var videoElem;

        switch(scope.mediaType) {
          default:
            videoElem = document.createElement('video');
            // Set video properties
            videoElem.id = scope.mediaId;
            videoElem.src = scope.showMediaVideo;
            $(elem.parent()).prepend(videoElem);

            videojs(videoElem.id, {
              "src": scope.showMediaVideo,
              "width": $(elem.parent()).width(),
              "controls": true,
              "autoplay": true,
              "preload": "auto",
              "loop": false,
              "poster": attrs.src
            }, function(){
              // Player (this) is initialized and ready.
              this.play();
              this.on('ended', function() {});
            });
        }
      });
    }
  };
});

app.directive('showActivity', ['$modal', function($modal) {
  return {
    restrict: 'A',
    scope: {
      activity: '=showActivity',
      endPoint: '=media'
    },
    link: function(scope, elem) {
      elem.bind('click', function() {
        $modal.open({
          controller: 'ActivityModalController',
          scope: scope,
          templateUrl: '/views/activity/index.html',
          windowClass: 'activity',
          backdrop: 'static'
        });
      });
    }
  };
}]);

app.directive('zoomFeedPhoto', ['$modal', function($modal) {
  return {
    restrict: 'A',
    scope: {
      activity: '=zoomFeedPhoto',
      endPoint: '=media'
    },
    link: function(scope, elem) {
      elem.bind('click', function() {
        $modal.open({
          controller: 'ActivityModalController',
          scope: scope,
          templateUrl: '/views/activity/zoom.html',
          windowClass: 'zoom-media',
          backdrop: 'static'
        });
      });
    }
  };
}]);

// Open new modal for album photos
app.directive('albumPhoto', ['$modal', function($modal) {
  return {
    restrict: 'A',
    scope: {
      photo: '=albumPhoto',
      endPoint: '=media'
    },
    link: function(scope, elem) {
      elem.bind('click', function() {
        $modal.open({
          controller: 'PhotoModalCtrl',
          scope: scope,
          templateUrl: '/views/profile/photo.html',
          windowClass: 'activity',
          backdrop: 'static'
        });
      });
    }
  };
}]);

// Open new modal for user videos
app.directive('userVideo', ['$modal', function($modal) {
  return {
    restrict: 'A',
    scope: {
      video: '=userVideo',
      endPoint: '=media'
    },
    link: function(scope, elem) {
      elem.bind('click', function() {
        $modal.open({
          controller: 'VideoModalCtrl',
          scope: scope,
          templateUrl: '/views/profile/video.html',
          windowClass: 'activity',
          backdrop: 'static'
        });
      });
    }
  };
}]);