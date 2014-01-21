'use strict';

app.factory('VotingService', function Voting($resource, $q, apiPrefix, AuthService) {
  return {
    get_current_polling: function() {
      var deferred = $q.defer(),
        CurrentVote = $resource(apiPrefix + '/dirty-girls/voting/current', { user_hash: AuthService.current_user().hash });

      CurrentVote.get({}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    },
    cast_vote: function() {

    }
  };
});
