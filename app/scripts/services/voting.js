'use strict';

app.factory('VotingService', ['$resource', '$q', 'endPoint', 'AuthService', function Voting($resource, $q, endPoint, AuthService) {
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
    }
  };
}]);
