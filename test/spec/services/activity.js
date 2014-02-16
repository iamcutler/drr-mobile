'use strict';

describe('Service: Activity', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var Activity;
  beforeEach(inject(function (_ActivityService_) {
    Activity = _ActivityService_;
  }));

  it('should do something', function () {
    expect(!!Activity).toBe(true);
  });

});
