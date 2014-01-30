'use strict';

app.controller('MessagesController', function ($scope, $state, $location, $anchorScroll, messages, MessageService, AuthService) {
  if($state.current.name == "messages") {
    $scope.title = "My Messages";

    $scope.messages = messages;

    // Set message timestamps to js date local times
    // Detect user messages and replace with user thumbnail
    angular.forEach($scope.messages.messages, function(val, key) {
      val.posted_on = moment.utc(val.posted_on).local();
    });
  }

  if($state.current.name == "message-thread") {
    // Set recepient name as the page title
    $scope.title = messages.user.name;
    // New message scope object
    $scope.new_msg = {
      user: AuthService.current_user().id,
      recepient: messages.user.id
    };

    // Assign message service promise to thread scope
    $scope.thread = messages;

    // Set message timestamps to js date local times
    angular.forEach($scope.thread.messages, function(val, key) {
      if(val.from == AuthService.current_user().id) {
        val.thumbnail = AuthService.current_user().thumbnail;
      } else {
        val.thumbnail = $scope.thread.user.thumbnail;
      }
      val.posted_on = moment.utc(val.posted_on).local();
    });

    // Get user id and assign to scope
    $scope.user_id = AuthService.current_user().id;

    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    };

    // Process new message
    $scope.processNewMessage = function(form) {
      if(form.$valid) {
        MessageService.new_message($scope.new_msg).then(function(response) {
          // Add new message to thread messages scope
          $scope.thread.messages.unshift({
            message: $scope.new_msg.message,
            from: $scope.new_msg.user,
            to: $scope.new_msg.recepient,
            thumbnail: AuthService.current_user().thumbnail,
            posted_on: moment.utc(new Date()).local()
          });
          // Reset message to blank after successful save
          $scope.new_msg.message = '';

          $scope.scrollTo('topThread');

          // Recall message service to get updated messages
          $scope.thread = messages;
        }, function(response) {
          console.error('Error saving new message');
        });
      }
    };
  }
});
