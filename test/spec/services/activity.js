'use strict';

describe('Service: Activity', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var Activity, mock;

  beforeEach(inject(function($injector) {
    mock = {};
    Activity = $injector.get('ActivityService');
  }));

  it('should do something', function () {
    expect(!!Activity).toBe(true);
  });

});
