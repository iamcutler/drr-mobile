'use strict';

app.controller('MessagesController', ['$scope', '$state', '$stateParams', '$location', '$anchorScroll', 'messages', 'MessageService', 'AuthService', function($scope, $state, $stateParams, $location, $anchorScroll, messages, MessageService, AuthService) {
  if($state.current.name === 'messages') {
    $scope.title = 'My Messages';

    $scope.messages = messages;

    // Set message timestamps to js date local times
    // Detect user messages and replace with user thumbnail
    angular.forEach($scope.messages, function(val) {
      val.message.posted_on = moment.utc(val.message.posted_on).local();
    });
  }

  if($state.current.name === 'messages.thread') {
    // Set recepient name as the page title
    //$scope.title = $scope.messages.messages.subject;

    // Find recepient id
    $scope.recepient = (messages.messages[0].from == AuthService.current_user().id) ? messages.messages[0].to : messages.messages[0].from;

    // New message scope object
    $scope.new_msg = {
      user: AuthService.current_user().id,
      recepient: $scope.recepient,
      parent: $stateParams.id
    };

    // Assign message service promise to thread scope
    $scope.thread = messages;

    // Set message timestamps to js date local times
    angular.forEach($scope.thread.messages, function(val) {
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
        var message = MessageService.new_message($scope.new_msg),
            submitBtn = $("form[name='" + form.$name + "'] button[type='submit']");

        // Disable button to prevend double clicks & show loader
        submitBtn.prop('disabled', true);
        submitBtn.addClass('message-loading');

        message.then(function() {
          // Add new message to thread messages scope
          $scope.thread.messages.unshift({
            message: $scope.new_msg.message,
            from: $scope.new_msg.user,
            to: $scope.new_msg.recepient,
            user_from: {
              thumbnail: AuthService.current_user().thumbnail
            },
            posted_on: moment.utc(new Date()).local()
          });
          // Reset message to blank after successful save
          $scope.new_msg.message = '';

          $scope.scrollTo('topThread');

          // Enable button & hide loader
          submitBtn.prop('disabled', false);
          submitBtn.removeClass('message-loading');

          // Recall message service to get updated messages
          $scope.thread = messages;
        }, function() {
          console.error('Error saving new message');
        });
      }
    };
  }
}]);
