'use strict';

xdescribe('Directive: Global', function () {

  // load the directive's module
  beforeEach(module('DRRMobileApp'));

  var element,
      scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();

    scope.current_user = {
      name: 'John Doe',
      thumbnail: 'http://placehold.it/100x100',
      slug: 'john-doe'
    };
  }));

  xdescribe('Directive: navigationUser', function() {
    it('should make hidden element visible', inject(function ($compile) {
      element = angular.element('<navigation-user ng-href="/#/profile/{{ current_user.slug }}" name="{{ current_user.name }}" thumbnail="{{ current_user.thumbnail }}"></navigation-user>');
      element = $compile(element)(scope);
      expect(element.span).toBe('/#/profile/john-doe');
    }));
  });

  describe('Directive: toggleNavigation', function() {
    beforeEach(function() {
      spyOnEvent($('#app-container'), 'click');
    });

    it('should click on navigation button', function() {
      $('#app-container').click();
      expect('click').toHaveBeenTriggeredOn('#app-container');
    });

    xit('should toggle navigation', function() {
      expect(element.position().toEqual(0));
    });
  });
});
