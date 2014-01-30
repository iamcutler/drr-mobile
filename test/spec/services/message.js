'use strict';

xdescribe('Service: Message', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  var rootScope,
      service,
      scope,
      httpBackend;

  beforeEach(inject(function($rootScope, $httpBackend, MessageService) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    service = MessageService;
    httpBackend = $httpBackend;
  }));

  afterEach(function ($rootScope) {
    $rootScope.$apply();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should resolve promise', function() {
    var result;

    service.user_messages().then(function(response) {
      result = response;
    });

    rootScope.$apply();
    expect(result.user.length).toEqual(5);
  });
});
