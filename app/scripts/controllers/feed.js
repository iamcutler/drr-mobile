'use strict';

app.controller('FeedController', ['$scope', '$state', 'ActivityService', 'feed', function($scope, $state, ActivityService, feed) {
  // News feed state
  if($state.current.name == 'feed') {
    $scope.title = "News Feed";
    // Set counter for infinite scrolling
    $scope.pageCounter = 10;
    // Assign scope feed to resolved promise
    $scope.feed = feed;
    $scope.mediaWidth = Number($(window).width() - 20);
    $scope.disabledScroll = false;
    $scope.busy = false;


    // Function to call on infinite scroll
    $scope.news_feed = {
      load: function() {
        if(!$scope.disabledScroll) {
          // Show loader
          $scope.busy = true;

          var news = ActivityService.news_feed($scope.pageCounter);

          news.then(function(response) {
            if(response.length > 0) {
              // If returning response that is not empty, push to scope and increment counter by 10
              angular.forEach(response, function(val, key) {
                $scope.feed.push(val);
              });
              $scope.pageCounter += 10;
            } else {
              // Disabled scroll after final content is fetched
              $scope.disabledScroll = true;
            }

            // Hide loader
            $scope.busy = false;
          }, function(error) {
            console.error(error);
          });
        }
      }
    };
  }
}]);