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
