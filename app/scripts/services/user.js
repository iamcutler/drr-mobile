'use strict';

app.factory('UserService', ['$http', '$q', 'endPoint', 'AuthService', function UserService($http, $q, endPoint, AuthService) {
  return {
    account_settings: function() {
      var defer = $q.defer();

      $http.get(endPoint.api + '/user/account/settings?user_hash=' + AuthService.current_user().hash)
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function() {
          defer.reject('Error fetching account settings');
        });

      return defer.promise;
    },
    update_account_settings: function(settings) {
      var defer = $q.defer();

      $http({
        method: 'POST',
        url: endPoint.api + '/user/account/settings',
        data: {
          settings: settings,
          user_hash: AuthService.current_user().hash
        }
      })
      .success(function(response) {
        defer.resolve(response);
      })
      .error(function() {
        defer.reject('Error updating account settings');
      });

      return defer.promise;
    },
    remove_friend: function(id) {
      var defer = $q.defer();

      $http({ method: 'DELETE', url: endPoint.api + '/user/connections/remove/' + id + '?user_hash=' + AuthService.current_user().hash })
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function() {
          defer.reject('Can not remove user connection');
        });

      return defer.promise;
    }
  };
}]);
