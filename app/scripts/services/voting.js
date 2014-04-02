'use strict';

app.factory('VotingService', ['$resource', '$q', '$cookieStore', 'endPoint', 'AuthService',
  function Voting($resource, $q, $cookieStore, endPoint, AuthService) {

  var Vote = $resource(endPoint.resourceApi + '/dirty-girls/voting/current', { user_hash: AuthService.current_user().hash });

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
    },
    // Track user voting via local cookie
    get_vote_timestamp: function() {
      return $cookieStore.get('last_vote');
    },
    set_vote_timestamp: function() {
      $cookieStore.put('last_vote', new Date());
    },
    clear_vote_timestamp: function() {
      $cookieStore.remove('last_vote');
    }
  };
}]);
