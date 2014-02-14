'use strict';

describe('Directive: activity', function () {

  // load the directive's module
  beforeEach(module('DRRMobileApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<activity></activity>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the activity directive');
  }));
});
