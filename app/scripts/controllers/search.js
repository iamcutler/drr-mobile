'use strict';

app.controller('SearchController', ['$scope', '$state', 'SearchService', function($scope, $state, SearchService) {

  if($state.current.name == 'search-people')
  {
    $scope.title = 'Find People';
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

  // Find Events
  if($state.current.name === 'event.search') {
    $scope.title = 'Find Upcoming Events';
    $scope.loading = false;
    $scope.load_counter = 0;
    $scope.scroll_disabled = false;
    $scope.search = {
      type: [
        { value: 'name', name: 'Name' },
        { value: 'location', name: 'Location' }
      ],
      params: {
        q: '',
        offset: 0,
        type: 'name'
      },
      // Search results object
      results: []
    };

    $scope.search_events = function(data) {
      $scope.loading = true;
      $scope.scroll_disabled = true;

      // Conditional on scroll action
      if(data.action === undefined) {
        $scope.load_counter = 0;
        $scope.search.results = [];
      }

      // Call search service
      var search = SearchService.find_events(data),
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
          // Convert dates to momentjs date objects
          value['startdate'] = moment.utc(value['startdate']).local();
          value['enddate'] = moment.utc(value['enddate']).local();

          $scope.search.results.push(value);
        });
      }, function(error) {
        console.error(error);
      });
    };

    // Function fired on infinite scrolling
    $scope.load_search_events = function() {
      var search_params = {
        q: $scope.search.params.q,
        offset: $scope.load_counter,
        type: 'name',
        action: 'scroll'
      };

      // Call function to populate results
      $scope.search_events(search_params);
    };
  }

  // Search Groups
  if($state.current.name === 'search-groups') {
    $scope.title = 'Find Groups';

    $scope.loading = false;
    $scope.load_counter = 0;
    $scope.scroll_disabled = false;
    $scope.search = {
      type: [
        { value: 'name', name: 'Name' },
        { value: 'location', name: 'Location' }
      ],
      params: {
        q: '',
        offset: 0,
        type: 'name'
      },
      // Search results collection array
      results: []
    };

    $scope.search_groups = function(data) {
      $scope.loading = true;
      $scope.scroll_disabled = true;

      // Conditional on scroll action
      if(data.action === undefined) {
        $scope.load_counter = 0;
        $scope.search.results = [];
      }

      // Call search service
      var search = SearchService.find_groups(data),
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
        angular.forEach(response, function(value) {
          $scope.search.results.push(value);
        });
      }, function(error) {
        // Send error to app errors array to display in UI
        $scope.appErrors.push({message: error});
      });
    };

    // Function fired on infinite scrolling
    $scope.load_search_groups = function() {
      var search_params = {
        q: $scope.search.params.q,
        offset: $scope.load_counter,
        action: 'scroll'
      };

      // Call function to populate results
      $scope.search_groups(search_params);
    };
  }
}]);
