'use strict';

app.factory('GroupService', function GroupService($resource, $q, endPoint, AuthService) {
  var resource = $resource(endPoint.resourceApi + '/user/groups/:id', {
    id: '@id',
    user_hash: AuthService.current_user().hash
  });

  return {
    find_group: function(id) {
      var defer = $q.defer();

      resource.get({
        id: id
      }, function(response) {
          defer.resolve(response);
        }, function() {
          console.error('Error fetching group service: find_group');
          defer.reject();
        });

      return defer.promise;
    }
  };
});
