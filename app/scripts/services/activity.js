'use strict';

app.factory('ActivityService', function ActivityService($resource, $q, resourceApiPrefix, AuthService) {
  var resource = $resource(resourceApiPrefix + "/user/activity/:id", {
    id: '@id',
    user_hash: AuthService.current_user().hash
  }, {});

  return {
    delete: function(id, app) {
      var defer = $q.defer();

      resource.delete({id: id, app: app}, function(response) {
        if(response.result) {
          defer.resolve(response);
        } else {
          defer.reject('Fetch removing activity');
        }
      }, function() {
        defer.reject('Fetch removing activity');
      });

      return defer.promise;
    }
  };
});
