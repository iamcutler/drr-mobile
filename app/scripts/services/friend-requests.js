'use strict';

app.service('RequestService', function FriendRequests($resource, $q, endPoint, AuthService) {
  var Requests = $resource(endPoint.resourceApi + '/user/connections/:id', {
    id: '@id',
    user_hash: AuthService.current_user().hash
  }, {
    update: { method: 'PUT' }
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
    send: function(id) {
      var defer = $q.defer();

      Requests.save({
        user: id
      }, function(response) {
        defer.resolve(response);
      }, function() {
        defer.reject('Error saving new friend request');
      });

      return defer.promise;
    },
    accept: function(id, callback) {
      Requests.update({ id: id }, function(response) {
        if(typeof callback === "function") {
          callback(response);
        }
      }, function() {
        console.log('Error accepting friend request');
      });
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
