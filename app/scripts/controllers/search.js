'use strict';

app.controller('SearchController', ['$scope', '$state', 'SearchService', function($scope, $state, SearchService) {

  if($state.current.name == "search-people")
  {
    $scope.title = "Find People";
    $scope.loading = false;
    $scope.search = {
      // Params to pass to backend
      params: {
        q: '',
        offset: 0,
        type: 'name',
      },
      // Search results object
      results: []
    };

    // Function to process search string
    $scope.search_users = function(data) {
      $scope.loading = true;
      // Call search service
      var search = SearchService.find_people(data);

      search.then(function(response) {
        $scope.loading = false;

        // Empty any previous results
        if($scope.search.results.length > 0) {
          $scope.search.results = [];
        }
        // Add response to results object scope
        angular.forEach(response, function(value, key) {
          $scope.search.results.push(value);
        });
      }, function(error) {
        console.error(error);
      });
    };
  }
}]);
