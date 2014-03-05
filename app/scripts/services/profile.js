'use strict';

app.factory('ProfileService', function ($http, $q, endPoint, AuthService) {
  return {
    getProfileData: function (params) {
      var deferred = $q.defer();

      $http.get(endPoint.api + "/user/profile/" + params.slug + "?user_hash=" + AuthService.current_user().hash).
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

      $http.get(endPoint.api + "/user/profile/friends/" + params.slug + "?user_hash=" + AuthService.current_user().hash, {
        cache: true
      }).
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

      $http.get(endPoint.api + "/user/profile/albums/" + params.slug + "?user_hash=" + AuthService.current_user().hash).
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

      $http.get(endPoint.api + "/user/profile/album/" + params.slug + "/" + params.id + "?user_hash=" + AuthService.current_user().hash).
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

      $http.get(endPoint.api + "/user/profile/videos/" + params.slug + "?user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          deferred.resolve(response);
        }).
        error(function() {
          console.error('Error fetching profile service: User videos');
        });

      return deferred.promise;
    },
    user_groups: function(params) {
      var deferred = $q.defer();

      $http.get(endPoint.api + "/user/profile/groups/" + params.slug + "?user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          deferred.resolve(response);
        }).
        error(function() {
          console.error('Error fetching profile service: user groups');
          deferred.reject();
        });

      return deferred.promise;
    },
    user_events: function(params) {
      var defer = $q.defer();

      $http.get(endPoint.api + "/user/profile/events/" + params.slug + "?user_hash=" + AuthService.current_user().hash)
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function() {
          console.error('Error fetching profile service: user_events');
          defer.reject();
        });

      return defer.promise;
    }
  };
});
