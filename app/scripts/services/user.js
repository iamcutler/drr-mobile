'use strict';

app.factory('UserService', function UserService($http, $q, endPoint, AuthService) {
  return {
    remove_friend: function(id) {
      var defer = $q.defer();

      $http({ method: 'DELETE', url: endPoint.api + "/user/connections/remove/" + id + "?user_hash=" + AuthService.current_user().hash })
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function() {
          defer.reject("Can't remove user connection");
        });

      return defer.promise;
    }
  };
});
