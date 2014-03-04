'use strict';

app.factory('DirtyGirlsService', function ($resource, $q, resourceApiPrefix, AuthService) {
  var DirtyGirl = $resource(resourceApiPrefix + '/dirty-girls/:id', {
    user_hash: AuthService.current_user().hash
  }, {
    'get': {
      method: 'get',
      cache: true
    }
  });

  return {
    get_dirty_girls: function () {
      var deferred = $q.defer();

      DirtyGirl.query({}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    },
    get_girl_by_id: function(id) {
      var deferred = $q.defer();

      // Call service to fetch dirty girl
      DirtyGirl.get({id: id}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    }
  };
});
