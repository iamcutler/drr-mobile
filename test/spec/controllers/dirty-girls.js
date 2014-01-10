'use strict';

describe('Controller: DirtyGirlsController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var DirtyGirlsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DirtyGirlsController = $controller('DirtyGirlsController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
