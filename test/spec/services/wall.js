'use strict';

xdescribe('Service: Wall', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var Wall;
  beforeEach(inject(function(WallService) {
    Wall = WallService;
  }));

  it('should do something', function () {
    expect(!Wall).toBe(true);
  });

});
