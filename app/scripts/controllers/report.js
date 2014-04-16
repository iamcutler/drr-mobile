'use strict';

app.controller("ReportController", ['$scope', '$state', '$location', 'ReportService',
  function($scope, $state, $location, ReportService) {
  
  // Report Bug
  if($state.current.name == "report-bug") {
    $scope.title = "Report a Problem";
    $scope.reportSubmitted = false;
    $scope.reportError = '';
    $scope.reportSuccess = false;
    $scope.report = {
      options: {
        news_feed: 'News Feed',
        friend_requests: 'Friend Requests',
        my_messages: 'My Messages',
        profile: 'My Profile',
        events: 'Upcoming Events',
        media: 'Media',
        notifications: 'Notifications',
        dirty_girls: 'Dirty Girls',
        dirty_voting: 'Dirty Girl Voting',
        dirty_submissions: 'Dirty Girl Submission',
        account_settings: 'Account Settings',
        other: 'Other'
      },
      bug: {
        type: 'mobile-app'
      }
    };

    // Reload view
    $scope.reload = function() {
      $scope.reportSubmitted = false;
      $scope.reportSuccess = false;
      $scope.report.bug.category = '';
      $scope.report.bug.message = '';
    };

    // Process bug submission
    $scope.submitBug = function(form) {
      if(form.$valid) {
        var button = $("form[name='" + form.$name + "'] button[type='submit']");

        // Disable and show loader
        button.addClass('btn-loader').addClass('primary-sm');
        button.prop('disabled', true);

        // Call report service to submit report
        ReportService.bug($scope.report.bug, function(response) {
          if(response.status) {
            // Enable and hide loader
            button.removeClass('btn-loader').removeClass('primary-sm');
            button.prop('disabled', false);

            // Assign successful report
            $scope.reportSuccess = true;
          }
        });
      } else {
        $scope.reportSubmitted = true;
      }
    };
  }
}]);
