'use strict';

app.controller('GroupController', ['$scope', '$state', '$stateParams', '$location', 'group', function($scope, $state, $stateParams, $location, group) {

  // Find group by id
  if($state.current.name == "group") {
    $scope.title = group.name.substr(0, 50);
    $scope.group = group;
    // Format group timestamp created to utc local
    $scope.group.created = moment.utc($scope.group.created).local();

    // Format announcements timestamps
    $scope.$watch(group.announcements, function() {
      angular.forEach(group.announcements, function(value, key) {
        group.announcements[key].date = moment.utc(group.announcements[key].date).local();
      });
    });

    // Format discussion timestamps
    $scope.$watch(group.discussions, function() {
      angular.forEach(group.discussions, function(value, key) {
        group.discussions[key].created = moment.utc(group.discussions[key].created).local();
      });
    });
  }
}]);
