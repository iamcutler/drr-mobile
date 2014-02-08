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
          console.error('Error fetching profile service: User friends');
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
          console.error('Error fetching profile service: User photo albums');
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
          console.error('Error fetching profile service: User photos');
        });

      return deferred.promise;
    },
    user_videos: function(params) {
      var deferred = $q.defer();

      $http.get(apiPrefix + "/user/profile/videos/" + params.slug + "?user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          deferred.resolve(response);
        }).
        error(function() {
          console.error('Error fetching profile service: User videos');
        });

      return deferred.promise;
    }
  };
});
