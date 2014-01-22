'use strict';

app.directive('sendReport', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      element.click(function() {
        scope.$watch('reportBug.$valid', function(validity) {
          if(validity) {
            element.attr('disabled','disabled');
          } else {
            element.attr('disabled', false);
          }
        });
      });
    }
  };
});
