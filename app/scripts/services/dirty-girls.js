'use strict';

app.factory('DirtyGirlsService', function ($resource, $q, apiPrefix, AuthService) {
  return {
    get_dirty_girls: function () {
      var deferred = $q.defer(),
          DirtyGirl = $resource(apiPrefix + '/dirty-girls', { user_hash: AuthService.current_user().hash });

      DirtyGirl.query({}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    },
    get_girl_by_id: function(id) {
      var deferred = $q.defer(),
          DirtyGirl = $resource(apiPrefix + '/dirty-girls/:id', { user_hash: AuthService.current_user().hash });

      // Call service to fetch dirty girl
      DirtyGirl.get({id: id}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    },
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
