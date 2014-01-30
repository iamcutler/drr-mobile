'use strict';

xdescribe('Controller: ReportController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var ReportController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportController = $controller('ReportController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
