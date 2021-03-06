'use strict';

app.factory('LikeService', ['$rootScope', '$http', '$q', 'endPoint', 'AuthService', function LikeService($rootScope, $http, $q, endPoint, AuthService) {
  return {
    like: function(element, id) {
      var defer = $q.defer();

      $http({
        method: 'POST',
        url: endPoint.api + '/user/like',
        params: {
          element: element,
          id: id,
          type: 1,
          user_hash: AuthService.current_user().hash
        }
      }).
        success(function(response) {
          defer.resolve(response);
        }).
        error(function() {
          console.error('Error saving this like.');
          defer.reject();
        });

      return defer.promise;
    },
    dislike: function(element, id) {
      var defer = $q.defer();

      $http({
        method: 'POST',
        url: endPoint.api + '/user/like/',
        params: {
          element: element,
          id: id,
          type: 0,
          user_hash: AuthService.current_user().hash
        }
      }).
        success(function(response) {
          defer.resolve(response);
        }).
        error(function() {
          console.error('Error saving this dislike.');
          defer.reject();
        });

      return defer.promise;
    }
  };
}]);
