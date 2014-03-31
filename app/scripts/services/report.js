'use strict';

app.factory('ReportService', ['$http', '$rootScope', 'endPoint', 'AuthService', function Report($http, $rootScope, endPoint, AuthService) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  return {
    bug: function(data, callback) {
      console.log({
        user_hash: AuthService.current_user().hash,
        category: data.category,
        message: data.message,
        bug_type: data.type
      });

      $http.post(endPoint.api + '/report/bug', {
        user_hash: AuthService.current_user().hash,
        category: data.category,
        message: data.message,
        bug_type: data.type
      }).
      success(function(response) {
        if(typeof callback === "function") {
          callback(response);
        }
      }).
      error(function() {
        console.error('Error sending bug report');
      });
    }
  };
}]);
