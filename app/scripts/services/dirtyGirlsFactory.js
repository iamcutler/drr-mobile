'use strict';

app.factory('dirtyGirlsFactory', function ($http, apiPrefix) {
  return {
    get_dirty_girls: function (callback) {
      $http.get(apiPrefix + '/dirty-girls').
        success(function(data) {
          if(typeof callback === "function") {
            callback(data);
          }
        }).
        error(function() {
          callback({error: true});
        });
    }
  };
});
