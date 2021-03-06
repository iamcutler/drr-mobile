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
        $('ul.voting-options li div.vote-action button').prop('disabled', true);

        // Show vote button loader
        element.children('button').addClass('loading');
        element.children('button').prop('disabled', true);

        // Call voting service to save vote
        VotingService.cast_vote(attrs.poll, attrs.answer, function(response) {
          element.children('button').removeClass('loading');
          // Hide any open modal
          $('div.modal').toggleClass('in','out');
          $('div.modal-backdrop').toggleClass('in','out');
          $('div.modal').delay(300).remove();
          $('div.modal-backdrop').delay(300).remove();
          // Set date object locally based on last vote to track voting periods
          VotingService.set_vote_timestamp();
          // Redirect to results
          $location.path('/vote/results');
        });
      });
    }
  };
}]);
