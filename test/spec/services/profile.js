'use strict';

describe('Service: ProfileService', function () {

  // load the service's module
  beforeEach(module('DrrmobileApp'));

  // instantiate service
  var Profile;
  beforeEach(inject(function (_Profile_) {
    Profile = _Profile_;
  }));

  it('should do something', function () {
    expect(!!Profile).toBe(true);
  });

});
