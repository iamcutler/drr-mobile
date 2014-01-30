'use strict';

xdescribe('Controller: DirtyGirlsController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var DirtyGirlsController,
      scope,
      state,
      rootScope,
      httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(angular.mock.inject(function($controller, $rootScope, $q, $state) {
    var deferred = $q.defer();

    scope = $rootScope.$new();
    rootScope = $rootScope;
    state = $state;
    httpBackend = $httpBackend;

    DirtyGirlsController = $controller('DirtyGirlsController', {
      $scope: scope
    });
  }));

  it('should have a title of Dirty Girls', inject(function () {
    state.transitionTo('dirty-girls');
    rootScope.$digest();
    expect(state.current.name).toBe('dirty-girls');
    expect(scope.title).toBe('Dirty Girls');
  }));
});
