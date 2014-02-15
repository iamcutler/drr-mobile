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
      templateUrl: "/views/auth/login.html",
      access: {
        require_user: false,
        allowLoggedIn: false
      }
    })
    .state("registeration", {
      parent: "auth",
      url: "/register",
      controller: "AuthController",
      templateUrl: "/views/auth/register.html",
      access: {
        require_user: false,
        allowLoggedIn: false
      }
    })
    .state("logout", {
      parent: "default",
      url: "/logout",
      controller: "AuthController",
      templateUrl: "/views/auth/logout.html",
      access: {
        require_user: true
      }
    })
    // New Feed
    .state("feed", {
      parent: "default",
      url: "/feed",
      controller: "FeedController",
      templateUrl: "/views/news-feed/index.html",
      access: {
        require_user: true
      }
    })
    // My Messages
    .state("messages", {
      parent: "default",
      url: "/messages",
      controller: "MessagesController",
      templateUrl: "/views/messages/index.html",
      access: {
        require_user: true
      },
      resolve: {
        messages: function(MessageService) {
          return MessageService.user_messages();
        }
      }
    })
    .state("messages.thread", {
      parent: "default",
      url: "/messages/:id",
      controller: "MessagesController",
      templateUrl: "/views/messages/thread.html",
      access: {
        require_user: true
      },
      resolve: {
        messages: function($stateParams, MessageService) {
          return MessageService.message_thread($stateParams.id);
        }
      }
    })
    // Friend Requests
    .state("friend-requests", {
      parent: "default",
      url: "/requests",
      controller: "RequestsController",
      templateUrl: "/views/friend-requests/index.html",
      access: {
        require_user: true
      },
      resolve: {
        requests: function(RequestService) {
          return RequestService.requests();
        }
      }
    })
    // ---------------- Profile ------------------
    .state("profile", {
      parent: "default",
      url: "/profile/:slug",
      controller: "ProfileController",
      templateUrl: "/views/profile/index.html",
      access: {
        require_user: true
      },
      resolve: {
        profile: function($stateParams, ProfileService) {
          return ProfileService.getProfileData($stateParams);
        },
        content: function() {}
      }
    })
    .state("profile.about", {
      parent: "default",
      url: "/profile/:slug/about",
      controller: "ProfileController",
      templateUrl: "/views/profile/about.html",
      access: {
        require_user: true
      },
      resolve: {
        profile: function() {}
      },
      content: function() {}
    })
    .state("profile.friends", {
      parent: "default",
      url: "/profile/:slug/friends",
      controller: "ProfileController",
      templateUrl: "/views/profile/friends.html",
      access: {
        require_user: true
      },
      resolve: {
        profile: function($stateParams, ProfileService) {
          return ProfileService.getProfileData($stateParams);
        },
        content: function($stateParams, ProfileService) {
          return ProfileService.user_friends($stateParams);
        }
      }
    })
    .state("profile.albums", {
      parent: "default",
      url: "/profile/:slug/photo_albums",
      controller: "ProfileController",
      templateUrl: "/views/profile/albums.html",
      access: {
        require_user: true
      },
      resolve: {
        profile: function($stateParams, ProfileService) {
          return ProfileService.getProfileData($stateParams);
        },
        content: function($stateParams, ProfileService) {
          return ProfileService.user_albums($stateParams);
        }
      }
    })
    .state("profile.albums.photos", {
      parent: "default",
      url: "/profile/:slug/album/:id",
      controller: "ProfileController",
      templateUrl: "/views/profile/photos.html",
      access: {
        require_user: true
      },
      resolve: {
        profile: function($stateParams, ProfileService) {
          return ProfileService.getProfileData($stateParams);
        },
        content: function($stateParams, ProfileService) {
          return ProfileService.album_photos($stateParams);
        }
      }
    })
    .state("profile.videos", {
      parent: "default",
      url: "/profile/:slug/videos",
      controller: "ProfileController",
      templateUrl: "/views/profile/videos.html",
      access: {
        require_user: true
      },
      resolve: {
        profile: function($stateParams, ProfileService) {
          return ProfileService.getProfileData($stateParams);
        },
        content: function($stateParams, ProfileService) {
          return ProfileService.user_videos($stateParams);
        }
      }
    })
    .state("profile.events", {
      parent: "default",
      url: "/profile/:slug/events",
      controller: "ProfileController",
      templateUrl: "/views/profile/events.html",
      access: {
        require_user: true
      },
      resolve: {
        profile: function($stateParams, ProfileService) {
          return ProfileService.getProfileData($stateParams);
        },
        content: function($stateParams, ProfileService) {
          return ProfileService.user_events($stateParams);
        }
      }
    })
    .state("profile.groups", {
      parent: "default",
      url: "/profile/:slug/groups",
      controller: "ProfileController",
      templateUrl: "/views/profile/groups.html",
      access: {
        require_user: true
      },
      resolve: {
        profile: function($stateParams, ProfileService) {
          return ProfileService.getProfileData($stateParams);
        },
        content: function($stateParams, ProfileService) {
          return ProfileService.user_groups($stateParams);
        }
      }
    })
    // -------------------- Groups --------------------
    .state("group", {
      parent: "default",
      url: "/groups/:id",
      controller: "GroupController",
      templateUrl: "/views/groups/index.html",
      access: {
        require_user: true
      },
      resolve: {
        group: function($stateParams, GroupService) {
          return GroupService.find_group($stateParams.id);
        }
      }
    })
    // -------------------- Events --------------------
    .state("event", {
      parent: "default",
      url: "/events/:id",
      controller: "EventsController",
      templateUrl: "/views/events/index.html",
      access: {
        require_user: true
      },
      resolve: {
        event: function($stateParams, EventService) {
          return EventService.find_event($stateParams.id);
        }
      }
    })
    .state("event.search", {
      parent: "default",
      url: "/search-events",
      controller: "EventsController",
      templateUrl: "/views/events/search.html",
      access: {
        require_user: true
      }
    })
    // -------------------- Media --------------------
    .state("media", {
      parent: "default",
      url: "/media",
      controller: "MediaController",
      templateUrl: "/views/media/index.html",
      access: {
        require_user: true
      }
    })
    // -------------------- Dirty Girls --------------------
    .state("dirty-girls", {
      parent: "default",
      url: "/dirty-girls",
      controller: "DirtyGirlsController",
      templateUrl: "/views/dirty-girls/index.html",
      access: {
        require_user: true
      },
      resolve: {
        dirty_girls: function(DirtyGirlsService) {
          return DirtyGirlsService.get_dirty_girls();
        }
      }
    })
    .state("dirty-girl-page", {
      parent: "default",
      url: "/dirty-girl/:id",
      controller: "DirtyGirlsController",
      templateUrl: "/views/dirty-girls/page.html",
      access: {
        require_user: true
      },
      resolve: {
        dirty_girls: function($stateParams, DirtyGirlsService) {
          return DirtyGirlsService.get_girl_by_id($stateParams.id);
        }
      }
    })
    // -------------------- Voting --------------------
    .state("vote", {
      parent: "default",
      url: "/vote",
      controller: "VotingController",
      templateUrl: "/views/voting/vote.html",
      access: {
        require_user: true
      },
      resolve: {
        votes: function(VotingService) {
          return VotingService.get_current_polling();
        }
      }
    })
    // Voting Results
    .state("vote-results", {
      parent: "default",
      url: "/vote/results",
      controller: "VotingController",
      templateUrl: "/views/voting/results.html",
      access: {
        require_user: true
      },
      resolve: {
        votes: function(VotingService) {
          return VotingService.get_current_polling();
        }
      }
    })
    // -------------------- Report bugs/problems --------------------
    .state("report-bug", {
      parent: "default",
      url: "/report",
      controller: "ReportController",
      templateUrl: "/views/report/bug.html",
      access: {
        require_user: true
      }
    })
    // Account settings
    .state("account-settings", {
      parent: "default",
      url: "/preferences",
      controller: "UserController",
      templateUrl: "/views/account/settings.html",
      access: {
        require_user: true
      }
    })
    // Errors
    .state("profile404", {
      parent: "default",
      url: "/error/profile/404",
      controller: "ProfileController",
      templateUrl: "/views/profile/404.html",
      access: {
        require_user: true
      }
    });
});

// Show page loader when loading resources and views
app.run(['$rootScope', function($root) {
  $root.$on('$stateChangeStart', function(e, curr, prev) {
    if(curr.resolve) {
      // Show a loading message until promises are not resolved
      $root.loadingView = true;
    }
  });
  $root.$on('$stateChangeSuccess', function(e, curr, prev) {
    // Hide loading message
    $root.loadingView = false;
  });
}]);