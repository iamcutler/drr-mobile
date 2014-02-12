'use strict';

app.service('EventService', function EventService($resource, $q, resourceApiPrefix, AuthService) {
  var resource = $resource(resourceApiPrefix + "/user/events/:id", {
    id: '@id',
    user_hash: AuthService.current_user().hash
  });

  return {
    find_event: function(id) {
      var defer = $q.defer();

      resource.get({ id: id }, function(response) {
        defer.resolve(response);
      }, function() {
        console.error('Error fetching events service: find_event');
        defer.reject();
      });

      return defer.promise;
    }
  };
});
