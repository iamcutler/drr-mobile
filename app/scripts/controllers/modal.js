'use strict';

app.controller('ModalController', function($scope, $modalInstance, ActivityService, MessageService, EventService, AuthService, user) {
  // Assign user to modal
  $scope.user = user;
  $scope.statusError = false;
  $scope.statusErrorMsg = '';

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
      app: 'photo'
    },
    video: {
      app: 'video'
    },
    event: {
      app: 'event'
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
});
