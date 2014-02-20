'use strict';

xdescribe('Controller: ActivityController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var ActivityController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivityController = $controller('ActivityController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
