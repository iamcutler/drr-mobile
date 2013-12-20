'use strict';

app.controller("ReportController", function ($scope, $state) {
  
  // Report Bug
  if($state.current.name == "report-bug") {
    $scope.title = "Report a Problem";
  }
});
