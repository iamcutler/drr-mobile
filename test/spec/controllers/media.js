'use strict';

describe('Controller: MediaController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var MediaController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediaController = $controller('MediaController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
