'use strict';

app.controller('ModalController', ['$scope', '$modalInstance', '$upload', '$state', 'endPoint', 'ActivityService', 'MessageService', 'EventService', 'AuthService', 'user',
  function($scope, $modalInstance, $upload, $state, endPoint, ActivityService, MessageService, EventService, AuthService, user) {

  // Assign user to modal
  $scope.user = user;
  $scope.statusError = {
    media: {
      error: false,
      message: ''
    },
    text: {
      error: false,
      message: ''
    }
  };
  $scope.statusSubmitted = false;
  $scope.fileProcessing = false;
  $scope.uploadPercentage = 0;

  // Sending a new message to user from model
  $scope.newMessage = {
    user: $scope.current_user.id,
    recepient: user.id,
    parent: 0
  };

  //------------------------- Status --------------------------
  $scope.new_status = {
    text: {
      app: 'status'
    },
    media: {
      app: 'media-status'
    },
    event: {
      app: 'event-status'
    }
  };

  // Text status
  $scope.newTextStatus = function(form) {
    if(form.$valid) {
      // Disable submit button to avoid multi calls
      $("form[name='" + form.$name + "'] button[type='submit']").prop('disabled', true);

      var status = ActivityService.new($scope.new_status.text);

      status.then(function(response) {
        $scope.statusError.text.error = false;

        // Add to scope
        switch($state.current.name) {
          case 'profile':
            $scope.profile.profile.feed.unshift(response.activity);
            break;
          case 'feed':
            $scope.feed.unshift(response.activity);
            break;
        }

        $modalInstance.dismiss();
      }, function(response) {
        // On error make share button available and show promise error message
        $("form[name='" + form.$name + "'] button[type='submit']").prop('disabled', false);
        $scope.statusError.text.error = true;
        $scope.statusError.text.message = response;
      });
    }
  };

  // Photo Status
  $scope.newMediaStatus = function($files) {
    // Hide form div and show loader
    $scope.fileProcessing = true;

    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: endPoint.api + '/user/activity?user_hash=' + AuthService.current_user().hash,
        method: 'POST',
        // headers: {'headerKey': 'headerValue'},
        // withCredentials: true,
        data: $scope.new_status.media,
        file: file,
        // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
        //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
        //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
        }).progress(function(evt) {
          // Change upload percent scope to change progress bar
          $scope.uploadPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function(response, status, headers, config) {
          // file is uploaded successfully
          if(response.result) {
            $scope.statusError.media.error = false;

            // Add to scope
            switch($state.current.name) {
              case 'profile':
                $scope.profile.profile.feed.unshift(response.activity);
                break;
              case 'feed':
                $scope.feed.unshift(response.activity);
                break;
              case 'media':
                $scope.media.unshift(response.activity);
                break;
            }

            $modalInstance.dismiss();
          } else {
            // Show error messages
            switch(response.code) {
              case 101:
                // Incorrect file format/extension
                $scope.fileProcessing = false;
                $scope.statusError.media.error = true;
                $scope.statusError.media.message = 'Incorrect file format. Only jpg, gif, png permitted.';
                break;
              case 103:
                // File is to big
                $scope.fileProcessing = false;
                $scope.statusError.media.error = true;
                $scope.statusError.media.message = 'File exceeded limit size. Please upload under 10 MB.';
                break;
              default:
                $scope.fileProcessing = false;
                $scope.statusError.media.error = true;
                $scope.statusError.media.message = 'Something went wrong while uploading. Please try again.';
            }
          }
        }).error(function() {
          $scope.fileProcessing = false;
          $scope.statusError.media.error = true;
          $scope.statusError.media.message = 'Something went wrong while uploading. Please try again.';
        });
    }
  };

  // Event Status
  $scope.newEventStatus = function(form) {
    if(form.$valid) {
      $scope.statusError = false;
      // Disable submit button to avoid multi calls
      $("form[name='" + form.$name + "'] button[type='submit']").prop('disabled', true);


    } else {
      $scope.statusError = true;
    }
  };

  // Get event categories and assign to scope on success
  EventService.categories().
    success(function(response) {
      $scope.event_categories = response;
    }).
    error(function() {
      console.log('Error fetching event categories');
    });

  // Dismiss modal instance
  $scope.close = function() {
    $modalInstance.dismiss();
  }

  $scope.newMessageThread = function(form) {
    if(form.$valid) {
      var send = MessageService.new_message($scope.newMessage);

      send.then(function(response) {
        if(response.status) {
          // Close modal on success
          $modalInstance.close();
        } else {
          console.error('Message Error');
        }
      });
    }
  };
}]);
