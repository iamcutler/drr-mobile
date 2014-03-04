'use strict';

describe('Controller: Modal', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var ModalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalCtrl = $controller('ModalController', {
      $scope: scope
    });
  }));

  xit('', function() {

  });
});
