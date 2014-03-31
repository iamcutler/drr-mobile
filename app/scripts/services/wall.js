'use strict';

app.factory('WallService', ['$resource', '$q', 'endPoint', 'AuthService', function WallService($resource, $q, endPoint, AuthService) {
  var resource = $resource(endPoint.resourceApi + "/user/wall/:id", {
    id: '@id',
    user_hash: AuthService.current_user().hash
  });

  return {
    save: function(comment) {
      var defer = $q.defer();

      resource.save(comment, function(response) {
        defer.resolve(response);
      }, function() {
        defer.reject("Can't save new comment");
      });

      return defer.promise;
    },
    delete: function(id) {
      var defer = $q.defer();

      resource.delete({id: id}, function(response) {
        defer.resolve(response);
      }, function() {
        defer.reject('Error removing comment.');
      });

      return defer.promise;
    }
  };
}]);
