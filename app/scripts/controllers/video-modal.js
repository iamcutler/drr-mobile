'use strict';

app.controller('VideoModalCtrl', ['$scope', '$modalInstance', 'AuthService', function ($scope, $modalInstance, AuthService) {
  // Close existing modal instance
  $scope.close = function() {
    $modalInstance.dismiss('Close video modal');
  };

  $scope.new_comment = {
    cid: $scope.video.id,
    app: 'videos',
    user: AuthService.current_user().id
  };

  // Format momentJS timestamps
  $scope.video.date = moment.utc($scope.video.date).local();

  $scope.$watchCollection('video.comments', function(newValues) {
    angular.forEach(newValues, function(value) {
      value.date = moment.utc(value.date).local();
    });
  });

  // Compose a new comment for photo
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
  };
}]);
