'use strict';

describe('Controller: PhotoModalCtrl', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var PhotoModalCtrl,
      scope,
      modalInstance;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    // Mock photos scope object
    scope.photo = {
      id: 1
    };
    // Create a mock object using spies
    modalInstance = {
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    PhotoModalCtrl = $controller('PhotoModalCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
  }));

  describe('initial state', function() {
    it('should instantiate the controller', function() {
      expect(PhotoModalCtrl).not.toBeUndefined();
    });

    it('should close modal', function() {
      scope.close();
      expect(modalInstance.dismiss).toHaveBeenCalled();
    });
  });
});
