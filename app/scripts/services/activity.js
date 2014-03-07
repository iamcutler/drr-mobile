'use strict';

app.factory('ActivityService', function ActivityService($http, $resource, $q, endPoint, AuthService) {
  var resource = $resource(endPoint.resourceApi + "/user/activity/:id", {
    id: '@id',
    user_hash: AuthService.current_user().hash
  }, {});

  return {
    find: function(id) {
      var defer = $q.defer();

      resource.get({id: id}, function(response) {
        defer.resolve(response);
      }, function() {
        defer.reject('Can not find activity');
      });

      return defer.promise;
    },
    new: function(data) {
      var defer = $q.defer();

      resource.save(data, function(response) {
        if(response.result) {
          defer.resolve(response);
        } else {
          defer.reject(response);
        }
      }, function(response) {
        defer.reject('Error occuried while saving. Try again later.');
      });

      return defer.promise;
    },
    event_attendance: function(event_id) {
      var defer = $q.defer();

      $http.post(endPoint.api + "/user/activity/event_attendance/" + event_id + "?user_hash=" + AuthService.current_user().hash)
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function() {
          defer.reject('Error saving event attendance');
        });

      return defer.promise;
    },
    delete: function(id, app) {
      var defer = $q.defer();

      resource.delete({id: id, app: app}, function(response) {
        if(response.result) {
          defer.resolve(response);
        } else {
          defer.reject('Fetch removing activity');
        }
      }, function() {
        defer.reject('Fetch removing activity');
      });

      return defer.promise;
    },
    media: function(offset) {
      var defer = $q.defer();

      $http.get(endPoint.api + "/user/feed_activity/media/" + offset + "?user_hash=" + AuthService.current_user().hash)
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function() {
          defer.reject('Error fetching latest media');
        });

      return defer.promise;
    }
  };
});
