'use strict';

app.directive('facebookLogin', ['$location', 'ezfb', 'AuthService', function($location, ezfb, AuthService) {
  return {
    restrict: 'E',
    template: '<a href="javascript:void(0)" class="btn btn-block btn-lg btn-facebook">Login via facebook</a>',
    link: function(scope, elem) {
      elem.bind('click', function() {
        // Check login status via facebook
        AuthService.facebook.status(function(res) {
          if(res.status == "connected") {
            AuthService.facebook.callback(function(data) {
              // Set user session and redirect to user feed
              AuthService.set_user_session(data.user);
              $location.path('/welcome');
            });
          } else {
            AuthService.facebook.login(function(response) {
              if(response.authResponse) {
                AuthService.facebook.callback(function(data) {
                  // Set user session and redirect to user feed
                  AuthService.set_user_session(data.user);
                  $location.path('/welcome');
                });
              } else {
                scope.loginError = 'Error logging in to facebook. Try again.';
              }
            });
          }
        });
      });
    }
  };
}]);

app.directive('toggleNavigation', function () {
  return function(scope, elem) {
    $(elem).click(function() {
      var appContainer = $("#app-container"),
           docWidth = $(document).width(),
           slideTiming = 100,
           position = 0;
           
      // Set position/toggle on navigation
      if(elem.hasClass('showNavi')) {
        position = 0;
        elem.removeClass('showNavi');
      } else {
        position = docWidth - 64;
        elem.addClass('showNavi');
      }
      
      // Animate navigation sliding
      appContainer.animate({
        left: position + "px"
      }, slideTiming);
    });
  };
});

app.directive('navigationItem', function() {
  return {
    restrict: 'E',
    scope: {
      ngHref: '@',
      icon: '@',
      title: '@'
    },
    template: '<a ng-href="{{ ngHref }}" class="menu-link"><div class="menu-icon"><i>{{ icon }}</i></div>{{ title }}</a>',
    link: function(scope, elem) {
      // On click, close navigation
      elem.bind('click', function() {
        $('#app-container').animate({
          left: "0px"
        }, 400);
        $('button.navbar-toggle').removeClass('showNavi');
      });
    }
  }
});

app.directive('navigationUser', function() {
  return {
    restrict: 'E',
    scope: {
      ngHref: '@',
      name: '@',
      thumbnail: '@'
    },
    template: '<a ng-href="{{ ngHref }}"><div class="thumb"><img ng-src="{{ thumbnail }}" /></div><span>{{ name }}</span></a>',
    link: function(scope, elem) {
      // On click, close navigation
      elem.bind('click', function() {
        $('#app-container').animate({
          left: "0px"
        }, 400);
        $('button.navbar-toggle').removeClass('showNavi');
      });
    }
  }
});

app.directive('pageIcon', function() {
  return {
    restrict: 'E',
    scope: {
      icon: '@',
      message: '@'
    },
    template: '<div class="page-icon"><div class="clearfix">{{ icon }}</div>{{ message }}</div>'
  };
});

app.directive('toggleEventNav', function() {
  return function(scope, elem, attrs) {
    elem.bind('click', function() {
      $('section[id^=event-]').hide();
      $('section#event-' + attrs.target).show();
    });
  };
});

app.directive('toggleGroupNav', function() {
  return function(scope, elem, attrs) {
    elem.bind('click', function() {
      $('section[id^=group-]').hide();
      $('section#group-' + attrs.target).show();
    });
  };
});

app.directive('fallbackSrc', function () {
  return {
    link: function postLink(scope, element, attrs) {
      element.bind('error', function() {
        var fallback = angular.element(this).attr("src", attrs.fallbackSrc);

        // Check if fallback is also broken
        fallback.error(function() {
          angular.element(this).attr('src', '/images/img_placeholder.png');
        });
      });
    }
  }
});