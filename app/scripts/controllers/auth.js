'use strict';

app.controller('AuthController', function ($scope) {

  // Logout
  if($state.current.name == "logout") {
    AuthService.clear_user_session();
    AuthService.logout();
  }
});
