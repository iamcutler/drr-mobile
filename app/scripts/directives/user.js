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
