'use strict';

describe('Service: Dirtygirlsfactory', function () {

  // load the service's module
  beforeEach(module('DrrmobileApp'));

  // instantiate service
  var Dirtygirlsfactory;
  beforeEach(inject(function (_Dirtygirlsfactory_) {
    Dirtygirlsfactory = _Dirtygirlsfactory_;
  }));

  it('should do something', function () {
    expect(!!Dirtygirlsfactory).toBe(true);
  });

});
