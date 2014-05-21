'use strict';

describe('Service: AuthService', function () {

  var scope, $http, endPoint, AuthService;

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  beforeEach(inject(function($rootScope, _AuthService_, _$httpBackend_, _endPoint_) {
    scope = $rootScope.$new();
    AuthService = _AuthService_;
    endPoint = _endPoint_
    $http = _$httpBackend_;
    $http.when("GET", "/views/layouts/default.html").respond(200, {});
    $http.when("GET", "/views/news-feed/index.html").respond(200, {});
    $http.when('GET', endPoint.api + '/user/feed_activity/0?user_hash=' + AuthService.current_user().hash).respond(200, {});
    //httpMock.whenPOST(apiPrefix + "/check/username/iamcutler").respond({ unique: false });
  }));

  afterEach(function() {
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });

  xit('Should have a working authentication service',
    inject(['AuthService', function (Auth) {

    //expect(Auth.check_username_uniqueness('UniqueUserName')).not.toBeNull();
    expect(AuthService.register({})).not.toBeNull();
    expect(AuthService.login({})).not.toBeNull();
  }]));

  xit('should return unique username', function() {
    $http.expect("POST", endPoint.api + "/check/username/UniqueUserName").respond({ "unique": true });

    var username = AuthService.check_username_uniqueness('UniqueUserName', function(response) {
      return response;
    });
    $http.flush();

    console.log(username.unique);
    //expect(username.unique).toBeTrue();
  });

  describe('current user', function() {
    beforeEach(function() {
      $http.flush();
    });

    it('should set user auth cookies', function() {
      AuthService.set_user_session({
        id: 1,
        name: 'Test User',
        username: 'test_user',
        thumbnail: 'http://placehold.it/300x300',
        slug: 'test-user',
        hash: '123456789'
      });

      expect(AuthService.current_user().id).toEqual('1');
      expect(AuthService.current_user().username).toEqual('test_user');
      expect(AuthService.current_user().thumbnail).toEqual('http://placehold.it/300x300');
      expect(AuthService.current_user().slug).toEqual('test-user');
      expect(AuthService.current_user().hash).toEqual('123456789');
    });

    it('should clear current user', function() {
      AuthService.clear_user_session();

      expect(AuthService.current_user().id).toBeUndefined();
    });

    it('should log out user', function() {
      $http.expect("GET", "/views/layouts/auth.html").respond(200);
      $http.expect("GET", "/views/auth/login.html").respond(200);
      AuthService.logout();
      $http.flush();

      expect(AuthService.current_user().hash).toBeUndefined();
    });
  });
});
