'use strict';

app.controller('DirtyGirlsController', function ($scope, $state, $stateParams, dirty_girls) {
  // Dirty Girls
  if($state.current.name == "dirty-girls") {
    $scope.title = "Dirty Girls";
    // Call to service to fetch data
    $scope.dirty_girls = dirty_girls;
  }

  // Dirty girl page
  if($state.current.name == "dirty-girl-page") {
    // Call dirty girl service to fetch dirty girl data
    $scope.title = dirty_girls.name;
    $scope.dirty_girl = dirty_girls;
  }

  // Dirty girl submissions
  if($state.current.name == "dirty-submission") {
    $scope.title = "Dirty Girl Submission";
    $scope.submissionSubmitted = false;
    $scope.submissionError = false;
    $scope.submissionErrorMsg = '';

    // Submission
    $scope.submission = {
      entry: {
        agree: {}
      },
      // Process submission
      submit: function(form) {
        $scope.submissionSubmitted = true;

        if(form.$valid) {
          console.log($scope.submission.entry);
        } else {
          $scope.submissionError = true;
        }
      }
    };
  }
});
