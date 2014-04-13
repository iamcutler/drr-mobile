'use strict';

describe('Directive: activity', function () {

  // load the directive's module
  beforeEach(module('DRRMobileApp'));

  var element,
      scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('Event attendance directive', function() {
    beforeEach(inject(function($compile) {
      element = angular.element('<select class="form-control" target="1" event-attendance><option value="0">Not Attending</option><option value="1">Attending</option></select>');
      element = $compile(element)(scope);
      scope.$digest();
    }));

    xit('eventAttendance directive', inject(function() {
      element.change();

      //expect(element).toBe;
    }));
  });

  describe('Remove wall directive', function() {
    beforeEach(inject(function($compile) {
      element = angular.element('<span model="activity.comments" target="1" index="0" remove-wall></span>');
      element = $compile(element)(scope);
    }));

    xit('', function() {

    });
  });

  describe('LikeThis', function() {
    beforeEach(inject(function($compile) {
      element = angular.element('<button type="button" element="photo" id="1" like="1" model="model" like-this><i>T</i> I Like This</button>');
      element = $compile(element)(scope);
      // Register on click event on element
      element.click();
    }));

    it('should disable button on click', function() {
      expect($(element)).toBeDisabled();
    });
  });
});
