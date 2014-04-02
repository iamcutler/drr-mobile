'use strict';

app.directive('castVote', ['$location', 'VotingService', function($location, VotingService) {
  return {
    restrict: 'E',
    scope: {
      poll: '@',
      answer: '@',
      period: '@'
    },
    template: '<button type="button" class="btn btn-lg btn-default" ng-poll-id="{{ poll }}" ng-answer="{{ answer }}">Vote</button>',
    link: function postLink(scope, element, attrs) {
      element.click(function() {
        // Disable all buttons after click to avoid double clicking or voting
        $('ul.voting-options li div.vote-action button').attr('disabled', 'disabled');

        // Show vote button loader
        element.children('button').addClass('loading');

        // Call voting service to save vote
        VotingService.cast_vote(attrs.poll, attrs.answer, function(response) {
          // Set date object locally based on last vote to track voting periods
          VotingService.set_vote_timestamp();
          // Redirect to results
          $location.path('/vote/results');
        });
      });
    }
  };
}]);
