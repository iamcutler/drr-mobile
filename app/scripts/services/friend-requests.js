'use strict';

app.service('RequestService', function FriendRequests($resource, $q, resourceApiPrefix, AuthService) {
  var Requests = $resource(resourceApiPrefix + '/requests/:id', {
    user_hash: AuthService.current_user().hash
  });

  return {
    requests: function() {
      var deferred = $q.defer();

      Requests.query({}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    },
    decline: function(id, callback) {
      Requests.delete({ id: id }, function(response) {
        if(typeof callback === "function") {
          callback(response);
        }
      });
    }
  };
});
