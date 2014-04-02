'use strict';

describe('Controller: VotingModalCtrl', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var VotingModalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VotingModalCtrl = $controller('VotingModalController', {
      $scope: scope
    });
  }));

  xit('', function () {

  });
});
