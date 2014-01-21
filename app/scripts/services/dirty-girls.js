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
    get_girl_by_id: function() {
      var deferred = $q.defer(),
          DirtyGirl = $resource(apiPrefix + '/dirty-girls/:id', { user_hash: AuthService.current_user().hash });

      // Call service to fetch dirty girl
      DirtyGirl.get({id: 3}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    }
    /*get_current_polling: function(callback) {
      $http.post(apiPrefix + '/dirty-girls/current_voting', { user_hash: AuthService.current_user().hash }).
        success(function(data) {
          if(typeof callback === "function") {
            callback(data);
          }
        }).
        error(function() {

        });
    },
    cast_vote: function() {

    }*/
  };
});
