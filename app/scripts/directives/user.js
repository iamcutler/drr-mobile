'use strict';

app.directive('friendRequest', function(RequestService) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      element.click(function() {
        var request = attrs.request,
            action = attrs.action;

        if(request != undefined && action != undefined) {
          // Disable button
          element.attr('disabled','disabled');

          if(action == 'accept') {
            // Call request accept method in requests service
            RequestService.accept(request, function() {
              element.parent().parent().parent().parent().fadeOut();
            });
          } else if(action == 'decline') {
            // Call request decline method in requests service
            RequestService.decline(request, function() {
              element.parent().parent().parent().parent().fadeOut();
            });
          }
        }
      });
    }
  };
});

app.directive('sendFriendRequest', function(RequestService) {
  return {
    restrict: 'A',
    scope: {
      target: '@'
    },
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        // Disable button on click to avoid duplicate requests
        elem.prop('disabled', true);

        var request = RequestService.send(scope.target);

        request.then(function(response) {
          if(response['result']) {
            elem.text('Request Sent');
          } else {
            elem.text('Unable to send');
          }
        }, function(error) {
          // Display error and make element available if error flags
          elem.prop('disabled', true);
          console.error(error);
        });
      });
    }
  };
});

app.directive('removeFriend', function(UserService) {
  return {
    restrict: 'A',
    scope: {
      target: '@'
    },
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        // Make sure target is a number
        if(angular.isDefined(scope.target)) {
          elem.prop('disabled', true);

          // Call remove friend function for User Service
          UserService.remove_friend(scope.target).then(function(response) {
            if(response.result) {
              elem.text('Friend Removed');
            } else {
              elem.text('Removal Failed');
            }
          });
        }
      });
    }
  };
});
