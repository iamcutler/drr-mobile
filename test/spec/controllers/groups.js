'use strict';

describe('Controller: GroupController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  var GroupCtrl,
      scope,
      group,
      $state,
      $http,
      $injector,
      endPoint,
      AuthService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$injector_, _$httpBackend_, _$state_, _AuthService_, _endPoint_) {
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
    endPoint = _endPoint_;
    AuthService = _AuthService_;

    // Expected requests
    $http.when('GET', '/views/layouts/default.html').respond(200, {});
    $http.when('GET', '/views/news-feed/index.html').respond(200, {});
    $http.when('GET', '/views/groups/index.html').respond(200, {});
    $http.when('GET', endPoint.api + '/user/feed_activity/0?user_hash=' + AuthService.current_user().hash).respond(200, {});
  }));

  afterEach(function () {
    $http.verifyNoOutstandingRequest();
    $http.verifyNoOutstandingExpectation();
  });

  xdescribe('group state', function() {
    beforeEach(function() {
      $http.when('GET', endPoint.api + '/user/groups/1?user_hash=' + AuthService.current_user().hash).respond(200, {});
    });

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
