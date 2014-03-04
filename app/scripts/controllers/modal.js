'use strict';

app.controller('ModalController', function($scope, $modalInstance, MessageService, user) {
  // Assign user to modal
  $scope.user = user;

  // Sending a new message to user from model
  $scope.newMessage = {
    user: $scope.current_user.id,
    recepient: user.id,
    parent: 0
  };

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
