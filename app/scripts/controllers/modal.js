'use strict';

app.controller('ModalController', ['$scope', '$modalInstance', '$upload', 'endPoint', 'ActivityService', 'MessageService', 'EventService', 'AuthService', 'user', function($scope, $modalInstance, $upload, endPoint, ActivityService, MessageService, EventService, AuthService, user) {
  // Assign user to modal
  $scope.user = user;
  $scope.statusError = false;
  $scope.statusErrorMsg = '';
  $scope.statusSubmitted = false;
  $scope.photoProcessing = false;
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
    photo: {
      app: 'photo-status'
    },
    video: {
      app: 'video-status'
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
        $scope.statusError = false;
        $modalInstance.dismiss();
      }, function(response) {
        // On error make share button available and show promise error message
        $("form[name='" + form.$name + "'] button[type='submit']").prop('disabled', false);
        $scope.statusError = true;
        $scope.statusErrorMsg = response;
      });
    }
  };

  // Photo Status
  $scope.newPhotoStatus = function($files) {
    var elem = $("div#photo-status form[name='newPhotoStatusForm']"),
        progressBar = $('div#photo-status .progress');

    // Hide form div and show loader
    elem.hide();
    progressBar.show();

    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: endPoint.api + '/user/activity?user_hash=' + AuthService.current_user().hash,
        method: 'POST',
        // headers: {'headerKey': 'headerValue'},
        // withCredentials: true,
        data: $scope.new_status.photo,
        file: file,
        // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
        //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
        //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
        }).progress(function(evt) {
          // Change upload percent scope to change progress bar
          $scope.uploadPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
          $modalInstance.dismiss();
        }).error(function() {
          elem.show();
          progressBar.hide();
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
