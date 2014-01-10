'use strict';

describe('Controller: VotingController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var VotingController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VotingController = $controller('VotingController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
