'use strict';

app.controller('ModalController', function($scope, $modalInstance, MessageService, EventService, user) {
  // Assign user to modal
  $scope.user = user;

  // Sending a new message to user from model
  $scope.newMessage = {
    user: $scope.current_user.id,
    recepient: user.id,
    parent: 0
  };

  //------------------------- Status --------------------------
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
