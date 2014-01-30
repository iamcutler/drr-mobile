'use strict';

xdescribe('Service: FriendRequests', function () {

  // load the service's module
  beforeEach(module('DrrmobileApp'));

  // instantiate service
  var FriendRequests;
  beforeEach(inject(function (_FriendRequests_) {
    FriendRequests = _FriendRequests_;
  }));

  it('should do something', function () {
    expect(!!FriendRequests).toBe(true);
  });

});
