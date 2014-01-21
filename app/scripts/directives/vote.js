'use strict';

app.directive('castVote', function ($location, VotingService) {
  return {
    restrict: 'E',
    scope: {
      poll: '@',
      answer: '@'
    },
    template: '<button type="button" class="btn btn-lg btn-default" ng-poll-id="{{ poll }}" ng-answer="{{ answer }}">Vote</button>',
    link: function postLink(scope, element, attrs) {
      element.click(function() {
        // Disable all buttons after click to avoid double clicking or voting
        $('ul.voting-options li div.vote-action button').attr('disabled', 'disabled');

        // Show vote button loader
        element.children('button').addClass('loading');

        // Call voting service to save vote
        console.log('Calling voting service');
        VotingService.cast_vote(attrs.poll, attrs.answer, function(response) {
          $location.path('/vote/results');
        });
      });
    }
  };
});
