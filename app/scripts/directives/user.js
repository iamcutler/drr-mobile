'use strict';

app.directive('declineFriendRequest', function(RequestService) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      element.click(function() {
        var request = attrs.request;

        if(request != undefined) {
          // Disable button
          element.attr('disabled','disabled');

          // Call request decline method in requests service
          RequestService.decline(request, function() {
            element.parent().parent().parent().parent().fadeOut();
          });
        }
      });
    }
  };
});
