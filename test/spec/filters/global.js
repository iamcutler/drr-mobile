'use strict';

describe('Filter: Global', function () {

  // load the filter's module
  beforeEach(module('DRRMobileApp'));

  describe('Filter: substr', function() {
    var substr;

    beforeEach(inject(function ($filter) {
      substr = $filter('substr');
    }));

    it('should return sub string', function() {
      var text = 'Dirty Rotten Rides';
      expect(substr(text, 0, 10)).toBe('Dirty Rott...');
    });

    it('should not return period tail on longer strings', function() {
      var text = 'Dirty Rotten Rides';
      expect(substr(text, 0, 100)).toBe(text);
    });
  });

  describe('Filter: MessageStructure', function() {
    var MessageStructure,
        user;

    beforeEach(inject(function($filter) {
      MessageStructure = $filter('MessageStructure');
      user = 100;
    }));

    it('should return secondary class when own user message', function() {
      expect(MessageStructure(user, 100)).toBe('right');
    });

    it('should not return secondary class', function() {
      expect(MessageStructure(user, 200)).toBeNull();
    });
  });

  describe('Filter: Strip_html_tags', function() {
    var strip_html;

    beforeEach(inject(function($filter) {
      strip_html = $filter('strip_html_tags');
    }));

    it('should strip tags and return new string', function() {
      expect(strip_html('<p>Testing is fun!</p>')).toBe('Testing is fun!');
    });
  });
});
