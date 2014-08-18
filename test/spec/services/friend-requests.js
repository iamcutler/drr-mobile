'use strict';

describe('Service: RequestService', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var RequestService,
      httpBackend,
      endPoint,
      AuthService,
      fakeConnections;

  beforeEach(inject(function(_$httpBackend_, _RequestService_, _endPoint_, _AuthService_) {
    AuthService = _AuthService_;
    // Set current user
    AuthService.set_user_session({
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      thumbnail: '',
      slug: '',
      hash: '6546516541651'
    });

    RequestService = _RequestService_;
    httpBackend = _$httpBackend_;
    endPoint = _endPoint_;
    fakeConnections = [{
        avatar: "images/avatar/64e5bfb08d6dec2024f75aea.jpg",
        id: 11416,
        msg: "Hi, I'd like to add you as friend.",
        name: "John Doe",
        slug: "1000:john-doe",
        thumbnail: "images/avatar/thumb_64e5bfb08d6dec2024f75aea.jpg",
        username: "john.doe"
    }];

    httpBackend.when('GET', '/views/layouts/default.html').respond(200);
    httpBackend.when('GET', '/views/news-feed/index.html').respond(200);
    httpBackend.when('GET', endPoint.api + '/user/feed_activity/0?user_hash=' + AuthService.current_user().hash).respond(200);
  }));

  describe('defined service functions', function() {
    it('requests', function() {
      expect(RequestService.requests).toBeDefined();
    });

    it('send', function() {
      expect(RequestService.send).toBeDefined();
    });

    it('accept', function() {
      expect(RequestService.accept).toBeDefined();
    });

    it('decline', function() {
      expect(RequestService.decline).toBeDefined();
    });
  });

  describe('service calls', function() {
    afterEach(function() {
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('get current friend requests', function () {
      httpBackend.whenGET(endPoint.resourceApi + '/user/connections?user_hash=' + AuthService.current_user().hash).respond(200, fakeConnections);

      RequestService.requests().then(function(data) {
        expect(data.length).toBe(1);
      });
    });

    it('send friend request', function() {
      httpBackend.whenPOST(endPoint.resourceApi + '/user/connections?user_hash=' + AuthService.current_user().hash).respond(200, { result: true });

      RequestService.send(21).then(function(data) {
        expect(data.result).toBe(true);
      });
    });

    it('accept friend request', function() {
      httpBackend.whenPUT(endPoint.resourceApi + '/user/connections/21?user_hash=' + AuthService.current_user().hash).respond(200, { status: true });

      RequestService.accept(21, function(response) {
        expect(response.status).toBe(true);
      });
    });

    it('declines friend request', function() {
      httpBackend.whenDELETE(endPoint.resourceApi + '/user/connections/21?user_hash=' + AuthService.current_user().hash).respond(200, { status: true });

      RequestService.decline(21, function(response) {
        expect(response.status).toBe(true);
      });
    });
  });
});
