'use strict';

app.factory('DirtyGirlsService', function ($resource, apiPrefix, AuthService) {
  var DirtyGirl = $resource(apiPrefix + '/dirty-girls/:id', {
    user_hash: AuthService.current_user().hash
  });

  return {
    get_dirty_girls: function (callback) {
      DirtyGirl.query({}, function(data) {
        if(typeof callback === "function" && data != undefined) {
          callback(data);
        } else {
          console.log('Error fetching dirty girls');
        }
      });
    },
    find_by_id: function(id, callback) {
      var girl = DirtyGirl.get({id: id}, function() {
        if(typeof callback === "function" && girl != undefined) {
          callback(girl);
        }
      });
    }
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
