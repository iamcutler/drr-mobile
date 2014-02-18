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