'use strict';

app.factory('SearchService', ['$http', '$q', 'endPoint', 'AuthService', function SearchService($http, $q, endPoint, AuthService) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  return {
    find_people: function(q) {
      var defer = $q.defer();

      // Add user_hash to q object for backend authenication
      q['user_hash'] = AuthService.current_user().hash;

      $http({
        method: 'GET',
        url: endPoint.api + "/user/search/people",
        params: q
      })
        .success(function(response) {
          defer.resolve(response);
        })
        .error(function(error) {
          defer.reject(error);
        });

      return defer.promise;
    }
  };
}]);
