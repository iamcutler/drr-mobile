'use strict';

app.service('EventService', function EventService($http, $resource, $q, endPoint, AuthService) {
  var resource = $resource(endPoint.resourceApi + "/user/events/:id", {
    id: '@id',
    user_hash: AuthService.current_user().hash
  });

  return {
    find_event: function(id) {
      var defer = $q.defer();

      resource.get({ id: id }, function(response) {
        defer.resolve(response);
      }, function() {
        console.error('Error fetching events service: find_event');
        defer.reject();
      });

      return defer.promise;
    },
    activity: function(id, offset) {
      var defer = $q.defer();

      $http.get(endPoint.api + "/user/feed_activity/event?id=" + id + "&offset=" + offset + "&user_hash=" + AuthService.current_user().hash).
        success(function(response) {
          defer.resolve(response);
        }).
        error(function() {
          defer.reject();
          console.error('Error fetching event activity');
        });

      return defer.promise;
    },
    categories: function() {
      return $http.get(endPoint.api + "/user/feed_activity/event-categories?user_hash=" + AuthService.current_user().hash);
    }
  };
});
