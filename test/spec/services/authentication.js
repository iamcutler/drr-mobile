'use strict';

xdescribe('Service: AuthService', function () {

  // load the service's module
  beforeEach(module('DrrmobileApp'));

  // instantiate service
  var Authentication;
  beforeEach(inject(function (_Authentication_) {
    Authentication = _Authentication_;
  }));

  it('should do something', function () {
    expect(!!Authentication).toBe(true);
  });

});
