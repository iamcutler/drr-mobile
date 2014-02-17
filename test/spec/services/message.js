'use strict';

xdescribe('Service: Message', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  var rootScope,
      service,
      scope,
      httpBackend,
      cookie;

  beforeEach(inject(function($rootScope, $httpBackend, $cookieStore, MessageService) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    service = MessageService;
    httpBackend = $httpBackend;

    $cookieStore.put('user_hash', 'b567b3a9b7983034e99d73d3064b7fe8d6bc7ecec73551173');

    httpBackend.whenGET("http://localhost:8000/user/messages/819?user_hash=b567b3a9b7983034e99d73d3064b7fe8d6bc7ecec73551173").respond(200);
    httpBackend.whenGET("/views/layouts/default.html").respond(200);
    httpBackend.whenGET("/views/news-feed/index.html").respond(200);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('User message thread', function() {
    it('should return current user thread', function() {
      service.message_thread(819).then(function(response) {
        rootScope.$digest();
        httpBackend.flush();
        expect(response.user.length).toEqual(5);
      });
    });
  });
});
