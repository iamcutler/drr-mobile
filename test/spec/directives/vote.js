'use strict';

describe('Directive: vote', function () {

  // load the directive's module
  beforeEach(module('DRRMobileApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vote></vote>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vote directive');
  }));
});
