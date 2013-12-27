'use strict';

app.directive('toggleDirtyGirls', function () {
  return {
    restrict: "E",
    link: function(scope, elem, attrs) {
      elem.bind("click", function() {
        // Show/hide dirty girl categories
        $("section.dirty-girls-of-the-month, section.dirty-girls-crew").hide();
        if(attrs.category == "monthly") {
          $("section.dirty-girls-of-the-month").show();
        } else {
          $("section.dirty-girls-crew").show();
        }
      });
    }
  }
});