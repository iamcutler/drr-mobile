'use strict';

app.filter('substr', function () {
  return function(input, start, max) {
    if(input.length > max) {
      return input.substr(start, max) + '...';
    } else {
      return input;
    }
  };
});

app.filter('MessageStructure', function() {
  return function(input, user_id) {
    if(input == user_id) {
      return 'right';
    }

    return null;
  }
});

app.filter('strip_html_tags', function() {
  return function(text) {
    return String(text).replace(/<[^>]+>/gm, '');
  }
});

app.filter('trustVideoURL', function($sce) {
  return function(text, type) {
    var mediaURL;

    switch(type) {
      case 'youtube':
        mediaURL = "http://www.youtube.com/v/" + text + "?version=3&amp;hl=en_US&amp;rel=0";
        break;
      case 'vimeo':
        mediaURL = "http://player.vimeo.com/video/" + text + "?title=0&amp;byline=0&amp;portrait=0&amp;badge=0";
        break;
    }

    return $sce.trustAsResourceUrl(mediaURL);
  };
});

app.filter("momentTime", function() {
  return function(input) {
    return moment.utc(input).local();
  }
});


app.filter('responsiveSubstr', ['$window', function($window) {
  return function(input, phone, tablet) {
    function responsive_string(input, phone, tablet) {
      var output;

      // Defaults
      phone = phone || 30;
      tablet = tablet || 70;

      // Smart phones (ex: iPhone, Android)
      if($window.matchMedia("(min-width : 320px) and (max-width : 568px)").matches) {
        output = input.substr(0, phone);

        if(input.length > phone) {
          output = output + "...";
        }
        // Tablets (ex: iPad, Surface)
      } else if($window.matchMedia("(min-width : 568px) and (max-width : 1024px)").matches) {
        output = input.substr(0, tablet);

        if(input.length > tablet) {
          output = output + "...";
        }
      } else {
        output = input;
      }

      return output;
    }

    return responsive_string(input, phone, tablet);
  }
}]);