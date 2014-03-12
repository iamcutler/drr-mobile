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
    media_upload: function(model) {
      $http({
        method: 'POST',
        url: endPoint.api + "user/activity?user_hash=" + AuthService.current_user().hash,
        //IMPORTANT!!! You might think this should be set to 'multipart/form-data'
        // but this is not true because when we are sending up files the request
        // needs to include a 'boundary' parameter which identifies the boundary
        // name between parts in this multi-part request and setting the Content-type
        // manually will not set this boundary parameter. For whatever reason,
        // setting the Content-type to 'false' will force the request to automatically
        // populate the headers properly including the boundary parameter.
        headers: { 'Content-Type': false },
        //This method will allow us to change how the data is sent up to the server
        // for which we'll need to encapsulate the model data in 'FormData'
        transformRequest: function (data) {
          var formData = new FormData();
          //need to convert our json object to a string version of json otherwise
          // the browser will do a 'toString()' on the object which will result
          // in the value '[Object object]' on the server.
          formData.append("model", angular.toJson(data.model));
          //now add all of the assigned files
          for (var i = 0; i < data.files; i++) {
            //add each file to the form data and iteratively name them
            formData.append("file" + i, data.files[i]);
          }
          return formData;
        },
        //Create an object that contains the model and files which will be transformed
        // in the above transformRequest method
        data: { model: model, files: model.file }
      })
        .success(function (data, status, headers, config) {
          console.log(data);
        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
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
    },
    news_feed: function(offset) {
      var defer = $q.defer();

      $http.get(endPoint.api + "/user/feed_activity/" + offset + "?user_hash=" + AuthService.current_user().hash)
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
