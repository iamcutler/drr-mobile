'use strict';

app.factory('DirtyGirlsService', ['$resource', '$http', '$q', '$upload', 'endPoint', 'AuthService',
  function DirtyGirlsService($resource, $http, $q, $upload, endPoint, AuthService) {

  var DirtyGirl = $resource(endPoint.resourceApi + '/dirty-girls/:id', {
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
    },
    submission: function(params) {
      var defer = $q.defer();

      // Send submission to backend service
      $http({ method: 'POST', url: endPoint.api + '/dirty-girls/submission', data: params })
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function(error) {
          defer.reject('Error saving dirty girl submission');
        });

      return defer.promise;
    }
  };
}]);
