'use strict';

describe('Filter: Global', function () {
  // load the filter's module
  beforeEach(module('DRRMobileApp'));

  describe('substr', function() {
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

  describe('MessageStructure', function() {
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

  describe('Strip_html_tags', function() {
    var strip_html;

    beforeEach(inject(function($filter) {
      strip_html = $filter('strip_html_tags');
    }));

    it('should strip tags and return new string', function() {
      expect(strip_html('<p>Testing is fun!</p>')).toBe('Testing is fun!');
    });
  });

  describe('Responsive sub string', function() {
    var string,
        substr,
        $window;

    beforeEach(inject(function($filter, _$window_) {
      string = "Testing the string based on a responsive window object";
      substr = $filter('responsiveSubstr');
      $window = _$window_;
    }));

    it('should format string based on phone width', function() {
      $window.innerWidth = 320;
      expect(substr(string)).toEqual("Testing the string based on a ...");
    });
  });

  describe('momentTime', function() {
    var filter, time;

    beforeEach(inject(function($filter) {
      time = '2013-08-23 16:35:44';
      filter = $filter('momentTime');
    }));

    it('converts time to moment object', function() {
      expect(filter(time)._isAMomentObject).toBe(true);
    });

    it('returns given time in moment object', function() {
      expect(filter(time)._i).toEqual(time);
    });
  });

  describe('trustVideoURL', function() {
    var filter, videoId;

    beforeEach(inject(function(_$filter_) {
      videoId = 6541841;
      filter = _$filter_('trustVideoURL');
    }));

    it('returns youtube video url', function() {
      expect(filter(videoId, 'youtube').$$unwrapTrustedValue()).toEqual('http://www.youtube.com/v/6541841?version=3&amp;hl=en_US&amp;rel=0');
    });

    it('returns vimeo video url', function() {
      expect(filter(videoId, 'vimeo').$$unwrapTrustedValue()).toEqual('http://player.vimeo.com/video/6541841?title=0&amp;byline=0&amp;portrait=0&amp;badge=0');
    });
  });
});
