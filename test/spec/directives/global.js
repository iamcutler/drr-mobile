'use strict';

describe('Directive: Global', function () {

  // load the directive's module
  beforeEach(module('DRRMobileApp'));

  var element,
      scope,
      member_section,
      feed_section;

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

  xdescribe('Directive: toggleNavigation', function() {
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

  describe('Directive: toggle event navigation', function() {
    beforeEach(inject(function($compile) {
      element = angular.element('<button type="button" class="btn btn-block" target="members" toggle-event-nav>Members</button>');
      element = $compile(element)(scope);

      member_section = angular.element('<section id="event-members"></section>');
      member_section = $compile(member_section)(scope);
      feed_section = angular.element('<section id="event-feed"></section>');
      feed_section = $compile(feed_section)(scope);

      document.body.appendChild(element[0]);
      document.body.appendChild(member_section[0]);
      document.body.appendChild(feed_section[0]);
    }));

    it('click event nav button', function() {
      spyOnEvent(element, 'click');

      element.click();
      expect('click').toHaveBeenTriggeredOn(element);
    });

    it('hide all sections on click and show only targeted section', function() {
      spyOnEvent(element, 'click');

      element.click();
      expect(feed_section).toBeHidden();
      expect(member_section).not.toBeHidden();
    });
  });

  describe('Directive: toggle group navigation', function() {
    beforeEach(inject(function($compile) {
      element = angular.element('<button type="button" class="btn btn-block" target="members" toggle-group-nav>Events</button>');
      element = $compile(element)(scope);

      member_section = angular.element('<section id="group-members"></section>');
      member_section = $compile(member_section)(scope);
      feed_section = angular.element('<section id="group-feed"></section>');
      feed_section = $compile(feed_section)(scope);

      document.body.appendChild(element[0]);
      document.body.appendChild(member_section[0]);
      document.body.appendChild(feed_section[0]);
    }));

    it('click group nav button', function() {
      spyOnEvent(element, 'click');

      element.click();
      expect('click').toHaveBeenTriggeredOn(element);
    });

    it('hide all sections on click and show only targeted section', function() {
      spyOnEvent(element, 'click');

      element.click();
      expect(feed_section).toBeHidden();
      expect(member_section).not.toBeHidden();
    });
  });
});
