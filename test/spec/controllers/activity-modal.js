'use strict';

describe('Controller: ActivityModalController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var ActivityModalCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivityModalCtrl = $controller('ActivityModalController', {
      $scope: scope
    });
  }));
});
