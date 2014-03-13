'use strict';

describe('Controller: GroupController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var GroupCtrl,
      scope,
      group,
      $state,
      $http,
      $injector;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$injector_, _$httpBackend_, _$state_) {
    scope = $rootScope.$new();
    GroupCtrl = $controller('GroupController', {
      $scope: scope,
      group: {
        title: 'Test group',
        description: 'A test group'
      }
    });
    $state = _$state_;
    $http = _$httpBackend_;
    $injector = _$injector_;

    // Expected requests
    $http.whenGET('/views/layouts/default.html').respond(200, {});
    $http.whenGET('/views/news-feed/index.html').respond(200, {});
  }));

  afterEach(function () {
    $http.verifyNoOutstandingRequest();
    $http.verifyNoOutstandingExpectation();
  });

  describe('group state', function() {
    xit('should be at the group state', function() {
      $state.go('group', { id: 1 });
      scope.$apply();
      expect($state.current.name).toBe('group');
    });

    it('should resolve group data', function() {
      $state.go('group', {id: 1});
      //scope.$digest();
      //expect($injector.invoke($state.current.resolve.group)).toBe('find_group');
    });

    it('should have a scope title', function() {
      $state.go('group');
      expect(scope.title).not.toBeNull();
    });

    it('should resolve group injection', function () {
      $state.go('group');
      expect(scope.group).not.toBeNull();
    });
  });
});
