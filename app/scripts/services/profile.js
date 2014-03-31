'use strict';

app.factory('ProfileService', ['$http', '$q', 'endPoint', 'AuthService', function ProfileService($http, $q, endPoint, AuthService) {
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
    about_user: function(params) {
      var defer = $q.defer();

      $http.get(endPoint.api + "/user/profile/about/" + params.slug + "?user_hash=" + AuthService.current_user().hash)
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function() {
          defer.reject('Error fetching profile about user data');
        });

      return defer.promise;
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
    user_video: function(params) {
      var deferred = $q.defer();

      $http.get(endPoint.api + "/user/profile/video/" + params.slug + "/" + params.id + "?user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          deferred.resolve(response);
        }).
        error(function() {
          console.error('Error fetching profile service: User video');
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
    },
    feed: function(slug, offset) {
      var defer = $q.defer();

      $http.get(endPoint.api + "/user/feed_activity/profile/" + slug + "/" + offset + "?user_hash=" + AuthService.current_user().hash)
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function(error) {
          defer.reject('Error fetching profile service: feed');
        });

      return defer.promise;
    },
    photo: function(params) {
      var defer = $q.defer();

      $http.get(endPoint.api + "/user/profile/photo/" + params.slug + "/" + params.id + "?user_hash=" + AuthService.current_user().hash)
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function(error) {
          defer.reject(error);
        });

      return defer.promise;
    }
  };
}]);
