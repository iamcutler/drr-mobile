'use strict';

app.factory('MessageService', function MessageService($resource, $q, endPoint, AuthService) {
  var Message = $resource(endPoint.resourceApi + '/user/messages/:id', {
    user_hash: AuthService.current_user().hash
  }, {
    id: '@id'
  });

  return {
    user_messages: function() {
      var deferred = $q.defer();

      Message.query({}, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    },
    message_thread: function(id) {
      var deferred = $q.defer();

      Message.get({ id: id }, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    },
    new_message: function(message) {
      var deferred = $q.defer();

      Message.save(message, function(response) {
        deferred.resolve(response);
      }, function() {
        deferred.reject();
      });

      return deferred.promise;
    }
  };
});
