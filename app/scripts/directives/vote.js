'use strict';

app.directive('castVote', function () {
  return {
    restrict: 'E',
    scope: {
      poll: '@',
      answer: '@'
    },
    template: '<button type="button" class="btn btn-lg btn-default" ng-poll-id="{{ poll }}" ng-answer="{{ answer }}">Vote</button>',
    link: function postLink(scope, element, attrs) {
      element.click(function() {
        console.log('Vote!');
      });
    }
  };
});
