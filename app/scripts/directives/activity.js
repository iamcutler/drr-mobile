'use strict';
/*
 * These angular directives are based on user activity. ex: Feeds, likes, etc.
 */

app.directive("likeThis", ['LikeService', function(LikeService) {
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
      // On click, fetch data to assign correct likes
      elem.bind('click', function() {
        var like = (scope.like == 1) ? LikeService.like(scope.element, scope.id) : LikeService.dislike(scope.element, scope.id);

        like.then(function(response) {
          // Update model scope binding
          scope.model.stats.likes = response.like.likes;
          scope.model.stats.dislikes = response.like.dislikes;
        });
      });
    }
  };
}]);

app.directive("eventAttendance", ['ActivityService', function(ActivityService) {
  return {
    restrict: 'A',
    scope: {
      target: '@'
    },
    link: function(scope, elem, attrs) {
      elem.bind('change', function() {
        //Update user attendance to this event
        ActivityService.event_attendance(scope.target);
      });
    }
  };
}]);

app.directive("removeActivity", ['ActivityService', function(ActivityService) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      index: '@',
      app: '@',
      target: '@'
    },
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        //if(confirm('Are you sure?')) {
          var remove = ActivityService.delete(scope.target, scope.app);

          remove.then(function() {
            scope.model.splice(scope.index, 1);
          }, function(response) {
            console.error(response);
          });
        //}
      });
    }
  };
}]);

app.directive("removeWall", ['WallService', function(WallService) {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      target: '@',
      index: '@'
    },
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        var remove = WallService.delete(scope.target);

        remove.then(function(response) {
          if(response.result) {
            scope.model.splice(scope.index, 1);
          }
        }, function(response) {
          console.error(response);
        });
      });
    }
  };
}]);