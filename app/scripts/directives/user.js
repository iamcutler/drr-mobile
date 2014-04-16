'use strict';

app.directive('friendRequest', ['RequestService', function(RequestService) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      element.click(function() {
        var request = attrs.request,
            action = attrs.action,
            buttons = element.parent().parent().find('button');

        if(request != undefined && action != undefined) {
          // Disable button
          buttons.prop('disabled', true);
          // Display default small loader
          element.addClass('btn-loader').addClass('default-sm');

          if(action == 'accept') {
            // Call request accept method in requests service
            RequestService.accept(request, function() {
              // Remove request from scope
              scope.requests.splice(index, attrs.index);
            });
          } else if(action == 'decline') {
            // Call request decline method in requests service
            RequestService.decline(request, function() {
              // Remove request from scope
              scope.requests.splice(attrs.index, 1);
            });
          }
        }
      });
    }
  };
}]);

app.directive('sendFriendRequest', ['RequestService', function(RequestService) {
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
}]);

app.directive('removeFriend', ['UserService', function(UserService) {
  return {
    restrict: 'A',
    scope: {
      target: '@'
    },
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        if(confirm('Are you sure you want to remove this user as a friend?')) {
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
        }
      });
    }
  };
}]);

app.directive('newStatus', ['$modal', 'EventService', 'AuthService', function($modal, EventService, AuthService) {
  return {
    restrict: 'A',
    scope: '@',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        $modal.open({
          templateUrl: '/views/profile/status/new-status.modal.html',
          controller: 'ModalController',
          scope: scope,
          resolve: {
            user: function() {
              return AuthService.current_user();
            }
          }
        });
      });
    }
  };
}]);

app.directive('toggleStatusType', function() {
  return {
    restrict: 'A',
    scope: {
      status: '@'
    },
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        // Change button classes
        $('#status-navigation button').removeClass('btn-primary').addClass('btn-default');
        elem.removeClass('btn-default').addClass('btn-primary');

        // Show/Hide status containers
        $('[id$=-status]').hide();
        $('#' + scope.status + '-status').show();
      });
    }
  };
});

app.directive('eventLength', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('change', function() {
        // Hide event times if all day event
        if(elem.val() == 1) {
          $('#eventStartTime, #eventEndTime').hide();
          $('#eventStartDate, #eventEndDate').removeClass().addClass('col-xs-10');
        } else {
          $('#eventStartTime, #eventEndTime').show();
          $('#eventStartDate, #eventEndDate').removeClass().addClass('col-xs-5');
        }
      });
    }
  };
});

app.directive('eventRepeat', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('change', function() {
        if(elem.val() == '') {
          $('#repeat-end').hide();
          elem.parent().removeClass().addClass('col-xs-10');
        } else {
          $('#repeat-end').show();
          elem.parent().removeClass().addClass('col-xs-5');
        }
      });
    }
  };
});