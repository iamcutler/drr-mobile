'use strict';

describe('Service: Like', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var LikeService,
      httpBackend,
      endPoint,
      AuthService;

  beforeEach(inject(function ($httpBackend, _LikeService_, _endPoint_, _AuthService_) {
    httpBackend = $httpBackend;
    LikeService = _LikeService_;
    endPoint = _endPoint_;
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

    httpBackend.when('GET', '/views/layouts/default.html').respond(200);
    httpBackend.when('GET', '/views/news-feed/index.html').respond(200);
    httpBackend.when('GET', endPoint.api + '/user/feed_activity/0?user_hash=' + AuthService.current_user().hash).respond(200);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('like feed element', function () {
    httpBackend.when('POST', endPoint.api + '/user/like?element=1&id=1&type=1&user_hash=' + AuthService.current_user().hash).respond(200, { status: true });
    LikeService.like(1, 1).then(function(response) {
      expect(response.status).toEqual(true);
    });

    httpBackend.flush();
  });

  it('dislike feed element', function () {
    httpBackend.when('POST', endPoint.api + '/user/like/?element=2&id=2&type=0&user_hash=' + AuthService.current_user().hash).respond(200, { status: true });
    LikeService.dislike(2, 2).then(function(response) {
      expect(response.status).toEqual(true);
    });

    httpBackend.flush();
  });
});
