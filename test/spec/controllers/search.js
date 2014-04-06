'use strict';

describe('Controller: SearchController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var SearchCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchCtrl = $controller('SearchController', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
