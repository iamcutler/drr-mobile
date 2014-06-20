'use strict';

app.controller('DirtyGirlsController', ['$scope', '$state', '$stateParams', '$upload', '$modal', 'DirtyGirlsService', 'AuthService', 'endPoint', 'dirty_girls',
  function($scope, $state, $stateParams, $upload, $modal, DirtyGirlsService, AuthService, endPoint, dirty_girls) {

  // Dirty Girls
  if($state.current.name === 'dirty-girls') {
    $scope.title = 'Dirty Girls';
    // Call to service to fetch data
    $scope.dirty_girls = dirty_girls;
  }

  // Dirty girl submissions
  if($state.current.name === 'dirty-submission') {
    $scope.title = 'Dirty Girl Submission';
    $scope.submissionSubmitted = false;
    $scope.submissionError = false;
    $scope.submissionErrorMsg = [];
    $scope.uploading = false;
    $scope.uploadPercentage = 0;
    $scope.submitSuccess = false;

    var d = new Date();
    $scope.pollDate = {
      date: new Date(),
      nextMonth: new Date(d.getFullYear(), new Date().getMonth() + 1, d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds())
    };

    // Submission
    $scope.submission = {
      entry: {
        age: '',
        favorite_car: '',
        favorite_pinup: '',
        special_talents: '',
        why_you: '',
        turn_on: '',
        turn_off: '',
        favorite_quote: '',
        user_hash: AuthService.current_user().hash,
      },
      agree: {},
      // Process submission
      submit: function(form, $files) {
        $scope.submissionSubmitted = true;

        // Submit
        if(form.$valid) {
          // Check if user uploaded 5 files
          if($files.length == 5) {
            // Check sure error messages are hidden
            $scope.submissionError = false;

            // Call dirty girls submission service
            DirtyGirlsService.submission($scope.submission.entry).then(function(response) {
              // If success, upload images
              if(response.result) {
                $scope.submissionError = false;

                // After successful submission save, call backend to save attached files
                $scope.uploading = true;

                // $files: an array of files selected, each file has name, size, and type.
                for(var i = 0; i < $files.length; i++) {
                  uploadSubmissionImage($scope, i, $files, response);
                }
              } else {
                $scope.submissionError = true;
                $scope.submissionErrorMsg.push('Something went wrong when saving. Try again.');
              }
            }, function(error) {
              $scope.submissionError = true;
              $scope.submissionErrorMsg.push(error);

              console.error(error);
            });
          } else {
            // Show error if less or more than 5 images
            $scope.submissionError = true;
            $scope.submissionErrorMsg.push('Please upload 5 images.');
          }
        } else {
          $scope.submissionError = true;
        }
      }
    };

    // Function to upload images
    var uploadSubmissionImage = function($scope, i, $files, submission) {
      var rowNum = Number(i + 1);

      $scope.upload = $upload.upload({
        method: 'POST',
        url: endPoint.api + '/dirty-girls/submission/image?id=' + submission.submission.id + '&num=' + rowNum + '&user_hash=' + AuthService.current_user().hash,
        file: $files[i]
      }).progress(function(evt) {
          // Change upload percent scope to change progress bar
          $scope.uploadPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function(response, status, headers, config) {
          // If final successful upload, disable loading
          if(rowNum == 5) {
            $scope.uploading = false;
            // Show thank you
            $scope.submitSuccess = true;
          }
        }).error(function(error) {
          console.error(error);
        });
    };
  }
}]);
