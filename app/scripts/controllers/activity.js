'use strict';

app.controller('ActivityController', ['$scope', '$state', 'activity', 'WallService', 'AuthService', function($scope, $state, activity, WallService, AuthService) {

  $scope.composeComment = function(form, scope, comment) {
    if(form.$valid) {
      var new_activity = WallService.save(comment),
          submitBtn = $("form[name='" + form.$name + "'] button[type='submit']");

      // Disable button to prevend double clicks & show loader
      submitBtn.prop('disabled', true);
      submitBtn.addClass('message-loading');

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
              username: response.wall.user.username,
              thumbnail: response.wall.user.thumbnail,
              avatar: response.wall.user.avatar,
              slug: response.wall.user.slug
            }
          });

          // Enable button & hide loader
          submitBtn.prop('disabled', false);
          submitBtn.removeClass('message-loading');

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
  if($state.current.name = 'activity') {
    $scope.title = "";
    $scope.activity = activity.activity;
    $scope.mediaWidth = Number($(window).width() - 20);
    $scope.new_comment = {
      cid: $scope.activity.comment_id,
      app: $scope.activity.comment_type,
      user: AuthService.current_user().id
    };
    // Format feed dates
    formatDatetime($scope.activity);
  }
}]);
