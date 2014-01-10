'use strict';

app.factory('ProfileService', function ($http, $location, AuthService, apiPrefix) {
  return {
    getProfileData: function (params, callback) {
      if(typeof callback === "function") {
        // if results are cached
        $http.post(apiPrefix + "/profile/" + params.slug, {hash: AuthService.current_user.hash}).
          success(function(data) {
            return callback(data[0]);
          }).
          error(function(data) {});
      }
    }
  };
});
