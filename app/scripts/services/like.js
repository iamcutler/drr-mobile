'use strict';

app.factory('LikeService', function LikeService($rootScope, $http, $q, apiPrefix, AuthService) {
  return {
    like: function(element, id) {
      var defer = $q.defer();

      $http.post(apiPrefix + "/user/like/like/" + element + "/" + id + "/1/?user_hash=" + AuthService.current_user().hash).
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

      $http.post(apiPrefix + "/user/like/like/" + element + "/" + id + "/0/?user_hash=" + AuthService.current_user().hash).
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
});
