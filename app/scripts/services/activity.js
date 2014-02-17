'use strict';

app.factory('ActivityService', function ActivityService($resource, $q, resourceApiPrefix, AuthService) {
  var resource = $resource(resourceApiPrefix + "/user/activity/:id", {
    id: '@id',
    user_hash: AuthService.current_user().hash
  }, {});

  return {
    new: function(data) {
      var defer = $q.defer();

      resource.save(data, function(response) {
        if(response.result) {
          defer.resolve(response);
        } else {
          defer.reject();
        }
      }, function() {
        console.error('Error saving activity.');
        defer.reject();
      });

      return defer.promise;
    },
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
