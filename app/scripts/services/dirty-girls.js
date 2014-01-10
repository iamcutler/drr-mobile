'use strict';

app.factory('DirtyGirlsService', function ($http, $resource, apiPrefix) {
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
    },
    find_by_id: function(params, girls) {
      var i;

      for(i = 0; i <= Number(girls.length - 1); i++) {
        // Match id param with dirty girl id
        if(girls[i].id == params.id) {
          return girls[i];
        }
      }
    }
  };
});
