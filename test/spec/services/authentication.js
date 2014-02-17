'use strict';

xdescribe('Service: AuthService', function () {

  var httpMock,
      apiPrefix,
      Auth;

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  beforeEach(inject(function($injector) {
    Auth = $injector.get('AuthService');
    httpMock = $injector.get('$httpBackend');
    apiPrefix = $injector.get('apiPrefix');
    httpMock.whenPOST(apiPrefix + "/check/username/UniqueUserName").respond({ unique: true });
    //httpMock.whenPOST(apiPrefix + "/check/username/iamcutler").respond({ unique: false });
  }));

  it('Should have a working authentication service',
    inject(['AuthService', function (Auth) {

    expect(Auth.check_username_uniqueness('UniqueUserName')).not.toBeNull();
    expect(Auth.register({})).not.toBeNull();
    expect(Auth.login({})).not.toBeNull();
  }]));

  it('should return unique username', function() {
    var username = Auth.check_username_uniqueness('UniqueUserName', function(response) {
      return response;
    });

    httpMock.flush();
    expect(username.unique).toBeTruthy();
  });
});
