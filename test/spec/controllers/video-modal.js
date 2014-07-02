'use strict';

describe('Controller: VideoModalCtrl', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var VideoModalCtrl,
      scope,
      modalInstance;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    // Mock video scope object
    scope.video = {
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
    VideoModalCtrl = $controller('VideoModalCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
  }));

  describe('initial state', function() {
    it('should instantiate the controller', function() {
      expect(VideoModalCtrl).not.toBeUndefined();
    });

    it('should close modal', function() {
      scope.close();
      expect(modalInstance.dismiss).toHaveBeenCalled();
    });

    describe('video comments', function() {
      it('should have app type defined', function() {
        expect(scope.new_comment.app).toBe('videos');
      });

      it('should have content id defined', function() {
        expect(scope.new_comment.cid).toEqual(1);
      });
    });
  });
});
