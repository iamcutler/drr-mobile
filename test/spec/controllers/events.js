'use strict';

describe('Controller: EventsController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var EventsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventsController = $controller('EventsController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
