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