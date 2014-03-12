'use strict';

app.controller('FeedController', function ($scope, feed) {
  $scope.title = "News Feed";

  // Assign scope feed to resolved promise
  $scope.feed = feed;
});
