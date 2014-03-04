'use strict';

app.factory('AuthService', function ($http, $rootScope, $cookieStore, $state, endPoint) {
  return {
    login: function(data, callback) {
      $http.post(endPoint.api + "/user/login", data).
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
      $http.post(endPoint.api + '/user', user).
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
        $state.go('login');
      }

      // Check if current user can access current controller
      if(!$state.current.access.require_user && !$state.current.access.allowLoggedIn && $cookieStore.get('user_hash') !== undefined) {
        $state.go('feed');
      }
    },
    current_user: function() {
      return {
        id: $cookieStore.get('user_id'),
        name: $cookieStore.get('user_name'),
        username: $cookieStore.get('username'),
        thumbnail: $cookieStore.get('user_thumbnail'),
        slug: $cookieStore.get('user_slug'),
        hash: $cookieStore.get('user_hash')
      };
    },
    set_user_session: function(user) {
      console.log(user);
      $cookieStore.put('user_id', user.id);
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
