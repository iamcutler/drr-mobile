app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // Enable HTML5 Push State
  $locationProvider.html5Mode(true);
  
  // For any unmatched url, redirect to home
  $urlRouterProvider.otherwise("/feed");
  
  $stateProvider
    .state("default", {
      abstract: true,
      views: {
        "": {
          controller: "ApplicationController",
          templateUrl: "/views/layouts/default.html"
        }
      }
    })
    .state("newsFeed", {
      parent: "default",
      url: "/feed",
      controller: "FeedController",
      templateUrl: "/views/news-feed/index.html"
    });
});