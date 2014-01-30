'use strict';

xdescribe('Controller: MessagesController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var MessagesController,
      scope,
      state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $state) {
    scope = $rootScope.$new();
    state = $state;
    MessagesController = $controller('MessagesController', {
      $scope: scope
    });
  }));

  it('should have messages', function () {
    if(state.current.name == "messages") {
      expect(scope.title).not.toBe(null);
    }
  });
});
