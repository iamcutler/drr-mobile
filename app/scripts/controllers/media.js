'use strict';

app.controller('MediaController', ['$scope', '$state', 'media', 'ActivityService', function($scope, $state, media, ActivityService) {

  var formatTimeStamp = function(scope) {
    angular.forEach(scope, function(val, key) {
      val.created = moment.utc(val.created).local();
    });
  };

  if($state.current.name == "media") {
    $scope.title = "Media";
    $scope.media = media;
    $scope.media_counter = 10;
    $scope.busy = false;
    $scope.feedDisabled = false;
    $scope.mediaWidth = Number($(window).width() - 20);

    // Format timestamps
    formatTimeStamp($scope.media);

    // media Feed object
    $scope.feed = {
      load: function() {
        if(!$scope.feedDisabled) {
          $scope.busy = true;
          var media = ActivityService.media($scope.media_counter);

          media.then(function(response) {
            // Set $scope.busy back to falsy to hide loader and enable scrolling
            $scope.busy == false;

            if(response.length > 0) {
              // Format new data to use moment js and convert to local timezone
              formatTimeStamp(response);

              // Loop thorugh and add new feed data to scope
              angular.forEach(response, function(val, key) {
                $scope.media.push(val);
              });
            } else {
              $scope.feedDisabled = true;
            }
          }, function(error) {
            console.error(error);
          });
        }
      }
    };
  }

  if($state.current.name == "activity") {
    $scope.title = "Media Post";
  }
}]);
