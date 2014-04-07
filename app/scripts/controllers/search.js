'use strict';

app.controller('SearchController', ['$scope', '$state', 'SearchService', function($scope, $state, SearchService) {

  if($state.current.name == "search-people")
  {
    $scope.title = "Find People";
    $scope.loading = false;
    $scope.load_counter = 0;
    $scope.scroll_disabled = false;
    $scope.search = {
      // Params to pass to backend
      params: {
        q: '',
        offset: 0,
        type: 'name'
      },
      // Search results object
      results: []
    };

    // Function to process search string
    $scope.search_users = function(data) {
      $scope.loading = true;
      $scope.scroll_disabled = true;

      // Conditional on scroll action
      if(data.action === undefined) {
        $scope.load_counter = 0;
        $scope.search.results = [];
      }

      // Call search service
      var search = SearchService.find_people(data),
          offset = 20;

      search.then(function(response) {
        $scope.loading = false;

        // add increments of 20 after successfull call
        // Function used for init call and infinite scrolling
        if(response.length > 0 || response.length < offset) {
          // Disable scrolling if response data has results
          $scope.scroll_disabled = false;
          $scope.load_counter += offset;
        }

        // Empty any previous results
        if($scope.search.results.length > 0 && $scope.load_counter == 0) {
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

    // Function fired on infinite scrolling
    $scope.load_search_users = function() {
      var search_params = {
        q: $scope.search.params.q,
        offset: $scope.load_counter,
        type: 'name',
        action: 'scroll'
      };

      // Call function to populate results
      $scope.search_users(search_params);
    };
  }
}]);
