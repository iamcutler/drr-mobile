'use strict';

app.factory('VotingService', function Voting($resource, $q, apiPrefix, AuthService) {
  var Vote = $resource(apiPrefix + '/dirty-girls/voting/current', { user_hash: AuthService.current_user().hash });

  return {
    get_current_polling: function() {
      var deferred = $q.defer();

      Vote.get({}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    },
    cast_vote: function(id, answer, callback) {
      // Cast vote
      var cast = Vote.get({}, function() {
        cast.id_answer = answer;
        cast.$save(function(response) {
          callback(response);
        });
      });
    }
  };
});
