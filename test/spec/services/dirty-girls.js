
'use strict';

describe('Service: DirtyGirlsService', function () {

  // load the service's module
  beforeEach(module('DrrmobileApp'));

  // instantiate service
  var DirtyGirlsService;
  beforeEach(inject(function (_DirtyGirlsService_) {
    DirtyGirlsService = _DirtyGirlsService_;
  }));

  it('should do something', function () {
    expect(!!DirtyGirlsService).toBe(true);
  });

});
