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
    },
    user_friends: function(params) {
      var deferred = $q.defer();

      $http.get(apiPrefix + "/user/profile/friends/" + params.slug + "?user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          deferred.resolve(response);
        }).
        error(function() {
          deferred.reject();
          console.log('Error fetching profile service: User friends');
        });

      return deferred.promise;
    },
    user_albums: function(params) {
      var deferred = $q.defer();

      $http.get(apiPrefix + "/user/profile/albums/" + params.slug + "?user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          deferred.resolve(response);
        }).
        error(function() {
          deferred.reject();
          console.log('Error fetching profile service: User photo albums');
        });

      return deferred.promise;
    },
    album_photos: function(params) {
      var deferred = $q.defer();

      $http.get(apiPrefix + "/user/profile/album/" + params.slug + "/" + params.id + "?user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          deferred.resolve(response);
        }).
        error(function() {
          deferred.reject();
          console.log('Error fetching user photos');
        });

      return deferred.promise;
    }
  };
});
