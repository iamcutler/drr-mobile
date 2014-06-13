'use strict';

app.factory('AuthService', ['$http', '$rootScope', '$location', '$state', 'endPoint', 'ezfb',
  function AuthService($http, $rootScope, $location, $state, endPoint, ezfb) {
  var self = this;

  return {
    login: function(data, callback) {
      $http.post(endPoint.api + "/login/user", data).
      success(function(data) {
        if(typeof callback === "function") {
          callback(data);
        }
      }).
      error(function() {});
    },
    facebook: {
      status: function(callback) {
        ezfb.getLoginStatus(function (res) {
          if(typeof callback === "function") {
            callback(res);
          }
        });
      },
      login: function(callback) {
        ezfb.login(function(res) {
          if(typeof callback === "function") callback(res);
        });
      },
      callback: function(callback) {
        ezfb.api('/me', function(res) {
          // If verified
          if(res.verified) {
            // call api to check user state
            $http({
              method: 'POST',
              url: endPoint.api + "/login/fb",
              data: res
            })
            .success(function(data) {
              if(data.status) {
                if(typeof callback === "function") callback(data);
              }
            });
          }
        });
      }
    },
    logout: function() {
      // Remove current user session
      $.removeCookie('user_hash', { path: '/' });
      $.cookie('isLoggedIn', false);
      // Redirect to login screen
      $state.go('login');
    },
    check_username_uniqueness: function(username, callback) {
      $http.post(endPoint.api + '/check/username/' + username, {}).
      success(function(data) {
        if(typeof callback === "function") {
          callback(data);
        }
      }).error(function() {});
    },
    register: function(user, callback) {
      $http.post(endPoint.api + '/register', user).
      success(function(data) {
        if(typeof callback === "function") {
          callback(data);
        }
      }).
      error(function() {});
    },
    check_user_access: function() {
      // Check if required user and logged in
      if($state.current.access.require_user && $.cookie('user_hash') === undefined) {
        $state.go('login');
      }

      // Check if current user can access current controller
      if(!$state.current.access.require_user && !$state.current.access.allowLoggedIn && $.cookie('user_hash') !== undefined) {
        $state.go('feed');
      }
    },
    current_user: function() {
      return {
        id: $.cookie('user_id'),
        name: $.cookie('user_name'),
        username: $.cookie('username'),
        thumbnail: $.cookie('user_thumbnail'),
        slug: $.cookie('user_slug'),
        hash: $.cookie('user_hash')
      };
    },
    set_user_session: function(user) {
      $.cookie('user_id', user.id, { expires: 365, path: '/' });
      $.cookie('user_name', user.name, { expires: 365, path: '/' });
      $.cookie('username', user.username, { expires: 365, path: '/' });
      $.cookie('user_thumbnail', user.thumbnail, { expires: 365, path: '/' });
      $.cookie('user_slug', user.slug, { expires: 365, path: '/' });
      $.cookie('user_hash', user.hash, { expires: 365, path: '/' });
      $.cookie('isLoggedIn', true, { expires: 365, path: '/' });
    },
    clear_user_session: function() {
      $.removeCookie('user_id', { path: '/' });
      $.removeCookie('user_name', { path: '/' });
      $.removeCookie('username', { path: '/' });
      $.removeCookie('user_thumbnail', { path: '/' });
      $.removeCookie('user_slug', { path: '/' });
      $.removeCookie('user_hash', { path: '/' });
      $.removeCookie('isLoggedIn', { path: '/' });
    }
  };
}]);
