'use strict';

xdescribe('Controller: RequestsCtrl', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var RequestsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestsCtrl = $controller('RequestsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
