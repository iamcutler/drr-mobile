'use strict';

app.factory('AuthService', function ($http, $rootScope, $location, $cookieStore, $state, apiPrefix) {
  return {
    login: function(data, callback) {
      $http.post(apiPrefix + "/user/login", data).
      success(function(data) {
        if(typeof callback === "function") {
          callback(data);
        }
      }).
      error(function() {});
    },
    logout: function() {
      // Remove current user session
      $cookieStore.remove('user_hash');
      $cookieStore.put('isLoggedIn', false);
      // Redirect to login screen
      $location.path('/login');
    },
    check_username_uniqueness: function(username, callback) {
      $http.post(apiPrefix + '/check/username/' + username, {}).
      success(function(data) {
        if(typeof callback === "function") {
          callback(data);
        }
      }).error(function() {});
    },
    register: function(user, callback) {
      $http.post(apiPrefix + '/user/registration', user).
      success(function(data) {
        if(typeof callback === "function") {
          callback(data);
        }
      }).
      error(function() {});
    },
    check_user_access: function() {
      // Check if required user and logged in
      if($state.current.access.require_user && $cookieStore.get('user_hash') === undefined) {
        $location.path('/login');
      }

      // Check if current user can access current controller
      if(!$state.current.access.require_user && !$state.current.access.allowLoggedIn && $cookieStore.get('user_hash') !== undefined) {
        $location.path('/feed');
      }
    },
    current_user: function() {
      return {
        name: $cookieStore.get('user_name'),
        username: $cookieStore.get('username'),
        thumbnail: $cookieStore.get('user_thumbnail'),
        slug: $cookieStore.get('user_slug'),
        hash: $cookieStore.get('user_hash')
      };
    },
    set_user_session: function(user) {
      console.log(user);
      $cookieStore.put('user_name', user.name);
      $cookieStore.put('username', user.username);
      $cookieStore.put('user_thumbnail', user.thumbnail);
      $cookieStore.put('user_slug', user.slug);
      $cookieStore.put('user_hash', user.hash);
      $cookieStore.put('isLoggedIn', true);
    },
    clear_user_session: function() {
      $cookieStore.remove('user_name');
      $cookieStore.remove('username');
      $cookieStore.remove('user_thumbnail');
      $cookieStore.remove('user_slug');
      $cookieStore.remove('user_hash');
      $cookieStore.remove('isLoggedIn');
    }
  };
});
