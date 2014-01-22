'use strict';

app.directive("toggleNavigation", function () {
  return function(scope, elem, attrs) {
    $(elem).click(function() {
      var appContainer = $("#app-container"),
           docWidth = $(document).width(),
           slideTiming = 400,
           position = 0;
           
      // Set position/toggle on navigation
      if(elem.hasClass("showNavi")) {
        position = 0;
        elem.removeClass("showNavi");
      } else {
        position = docWidth - 64;
        elem.addClass("showNavi");
      }
      
      // Animate navigation sliding
      appContainer.animate({
        left: position + "px"
      }, slideTiming);
    });
  };
});

app.directive("navigationItem", function() {
  return {
    restrict: 'E',
    scope: {
      ngHref: '@',
      icon: '@',
      title: '@'
    },
    template: '<a ng-href="{{ ngHref }}" class="menu-link"><div class="menu-icon">{{ icon }}</div>{{ title }}</a>',
    link: function(scope, elem, attrs) {
      // On click, close navigation
      elem.bind("click", function() {
        $("#app-container").animate({
          left: "0px"
        }, 400);
        $("button.navbar-toggle").removeClass("showNavi");
      });
    }
  }
});

app.directive("navigationUser", function() {
  return {
    restrict: 'E',
    scope: {
      ngHref: '@',
      name: '@',
      thumbnail: '@'
    },
    template: '<a ng-href="{{ ngHref }}"><div class="thumb"><img ng-src="{{ thumbnail }}" /></div><span>{{ name }}</span></a>',
    link: function(scope, elem, attrs) {
      // On click, close navigation
      elem.bind("click", function() {
        $("#app-container").animate({
          left: "0px"
        }, 400);
        $("button.navbar-toggle").removeClass("showNavi");
      });
    }
  }
});

app.directive("pageIcon", function() {
  return {
    restrict: 'E',
    scope: {
      icon: '@',
      message: '@'
    },
    template: '<div class="page-icon"><div class="clearfix">{{ icon }}</div>{{ message }}</div>'
  };
});