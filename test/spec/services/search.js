'use strict';

describe('Service: Search', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var SearchService;
  beforeEach(inject(function (_SearchService_) {
    SearchService = _SearchService_;
  }));

  xit('should do something', function () {
    expect(!!SearchService).toBe(true);
  });

});
