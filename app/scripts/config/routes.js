app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // Enable HTML5 Push State
  $locationProvider.html5Mode(true);
  
  // For any unmatched url, redirect to home
  $urlRouterProvider.otherwise("/feed");
  
  $stateProvider
    // Layouts
    .state("default", {
      abstract: true,
      controller: "ApplicationController",
      templateUrl: "/views/layouts/default.html"
    })
    .state("auth", {
      abstract: true,
      controller: "ApplicationController",
      templateUrl: "/views/layouts/auth.html"
    })
    // Authenicatation
    .state("login", {
      parent: "auth",
      url: "/login",
      controller: "AuthController",
      templateUrl: "/views/auth/login.html"
    })
    .state("registeration", {
      parent: "auth",
      url: "/register",
      controller: "AuthController",
      templateUrl: "/views/auth/register.html"
    })
    // New Feed
    .state("feed", {
      parent: "default",
      url: "/feed",
      controller: "FeedController",
      templateUrl: "/views/news-feed/index.html"
    })
    // My Messages
    .state("messages", {
      parent: "default",
      url: "/messages",
      controller: "MessagesController",
      templateUrl: "/views/messages/index.html"
    })
    // Friend Requests
    .state("friend-requests", {
      parent: "default",
      url: "/requests",
      controller: "RequestsController",
      templateUrl: "/views/friend-requests/index.html"
    })
    // Events
    .state("search-events", {
      parent: "default",
      url: "/search-events",
      controller: "EventsController",
      templateUrl: "/views/events/search.html"
    })
    // Media
    .state("media", {
      parent: "default",
      url: "/media",
      controller: "MediaController",
      templateUrl: "/views/media/index.html"
    })
    // Report bugs/problems
    .state("report-bug", {
      parent: "default",
      url: "/report",
      controller: "ReportController",
      templateUrl: "/views/report/bug.html"
    });
});