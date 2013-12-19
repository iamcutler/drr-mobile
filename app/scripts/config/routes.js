app.config(function($stateProvider, $urlRouterProvider) {
  // For any unmated url, redirect to home
  $urlRouterProvider.otherwise("/feed");
  
  $stateProvider
    .state('newsFeed', {
      url: "/feed",
      templateUrl: "/views/news-feed/index.html",
      controller: "MainCtrl"
    });
});