'use strict';

app.factory('ProfileService', function ($http, $q, apiPrefix, AuthService) {
  return {
    getProfileData: function (params) {
      var deferred = $q.defer();

      $http.get(apiPrefix + "/user/profile/" + params.slug + "?user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          deferred.resolve(response);
        }).
        error(function() {
          deferred.reject();
        });

      return deferred.promise;
    }
  };
});
