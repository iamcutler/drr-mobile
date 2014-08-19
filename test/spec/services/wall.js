'use strict';

describe('Service: Wall', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var WallService, AuthService, httpBackend, endPoint, fakeWall, saveWall;

  beforeEach(inject(function(_WallService_, _AuthService_, _$httpBackend_, _endPoint_) {
    WallService = _WallService_;
    AuthService = _AuthService_;
    httpBackend = _$httpBackend_;
    endPoint = _endPoint_;

    // Set current user
    AuthService.set_user_session({
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      thumbnail: '',
      slug: '',
      hash: '6546516541651'
    });

    httpBackend.whenGET('/views/layouts/default.html').respond(200);
    httpBackend.whenGET('/views/news-feed/index.html').respond(200);
    httpBackend.whenGET(endPoint.api + '/user/feed_activity/0?user_hash=' + AuthService.current_user().hash).respond(200);
  }));

  it('should be defined', function() {
    expect(WallService).toBeDefined();
  });

  describe('send new wall message', function() {
    beforeEach(function() {
      fakeWall = {
        result: true,
        wall: {
          id: 1,
          type: 'wall',
          comment: 'testing wall',
          created: new Date(),
          user: {
            id: 1,
            name: 'John Doe',
            username: 'john-doe',
            thumbnail: '',
            avatar: '',
            slug: 'john-doe'
          }
        }
      };

      saveWall = WallService.save();
      httpBackend.when('POST', endPoint.resourceApi + '/user/wall?user_hash=' + AuthService.current_user().hash).respond(200, fakeWall);
    });

    afterEach(function() {
      httpBackend.flush();
    });

    it('save new wall message successfully', function () {
      saveWall.then(function(response) {
        expect(response.result).toBe(true);
      });
    });

    it('save message returns a user', function() {
      saveWall.then(function(response) {
        expect(response.wall.user.id).toBe(1);
      });
    });
  });

  describe('removing wall message', function() {
    beforeEach(function() {
      httpBackend.whenDELETE(endPoint.resourceApi + '/user/wall/1?user_hash=' + AuthService.current_user().hash).respond(200, { result: true })
    });

    afterEach(function() {
      httpBackend.flush();
    });

    it('successfully removed wall message', function() {
      WallService.delete(1).then(function(response) {
        expect(response.result).toBe(true);
      });
    });
  });
});
