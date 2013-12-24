'use strict';

describe('Controller: VotingCtrl', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var VotingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VotingCtrl = $controller('VotingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
