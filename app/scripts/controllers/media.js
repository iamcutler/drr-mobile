'use strict';

app.controller('MediaController', function ($scope, $state, media, ActivityService) {

  var formatTimeStamp = function(scope) {
    angular.forEach(scope, function(val, key) {
      val.created = moment.utc(val.created).local();
    });
  };

  $scope.feed = {
    load: function() {
      console.log('loading');
    }
  };

  if($state.current.name = "media") {
    $scope.title = "Media";
    $scope.media = media;
    $scope.media_counter = 10;
    $scope.busy = false;

    // Format timestamps
    formatTimeStamp($scope.media);

    console.log(media);
  }

  if($state.current.name == "media.post") {
    $scope.title = "Media Post";
  }
});
