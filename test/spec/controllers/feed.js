'use strict';

describe('controller: feed', function() {
  var scope, controller, state, httpBackend, AuthService, endPoint;

  beforeEach(module('DRRMobileApp'));

  beforeEach(inject(function($rootScope, $controller, _$state_, _$httpBackend_, _AuthService_, _endPoint_) {
    scope = $rootScope.$new();
    state = _$state_;
    httpBackend = _$httpBackend_;
    AuthService = _AuthService_;
    endPoint = _endPoint_;
    $controller('FeedController', {
      $scope: scope,
      // Resolved data
      feed: {
        created: new Date()
      }
    });

    scope.$digest();

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

  describe('feed state', function() {
    beforeEach(function() {
      state.transitionTo('feed');
      httpBackend.flush();
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('current state name', function() {
      expect(state.current.name).toEqual('feed');
    });

    it('logged in user required', function() {
      expect(state.current.access.require_user).toBe(true);
    });
  });
});