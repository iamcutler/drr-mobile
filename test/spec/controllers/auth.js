'use strict';

xdescribe('Controller: AuthController', function () {

  // load the controller's module
  beforeEach(module('DRRMobileApp'));

  // load controller widgets/views/partials
  var views = [
    '/views/auth/login.html'
  ];

  views.forEach(function(view) {
    //beforeEach(module(view));
  });

  var AuthController,
      $httpBackend,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    AuthController = $controller('AuthController', {
      $scope: scope
    });
    $httpBackend.whenGET('/views/layouts/auth.html').respond(200, '', {});
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a login state', inject(function($state, $rootScope) {
    $state.transitionTo('login');
    $rootScope.$apply();
    expect($state.current.name).toBe('login');
    $httpBackend.flush();
  }));
});
