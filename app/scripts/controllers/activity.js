'use strict';

app.controller('ActivityController', function ($scope, $state, activity, WallService, AuthService) {

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
      }, function(response) {
        console.error(response);
      });
    }
  }

  var formatDatetime = function(scope) {
    scope.created = moment.utc(scope.created).local();
    angular.forEach(scope.comments, function(value, key) {
      scope.comments[key].date = moment.utc(scope.comments[key].date).local();
    });
  };

  // Profile activity
  if($state.current.name = 'user-activity') {
    $scope.title = "";
    $scope.activity = activity.activity;
    $scope.new_comment = {
      cid: $scope.activity.comment_id,
      app: $scope.activity.comment_type,
      user: AuthService.current_user().id
    };
    // Format feed dates
    formatDatetime($scope.activity);
  }
});
