'use strict';
/*
 * These angular directives are based on user activity. ex: Feeds, likes, etc.
 */

app.directive("likeThis", function(LikeService) {
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
        var like;
        like = (scope.like == 1) ? LikeService.like(scope.element, scope.id) : LikeService.dislike(scope.element, scope.id);
        console.log(like);
        like.then(function(response) {
          // Update model scope binding
          scope.model.stats.likes = response.like.likes;
          scope.model.stats.dislikes = response.like.dislikes;
        });
      });
    }
  };
});
