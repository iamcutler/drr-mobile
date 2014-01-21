'use strict';

describe('Service: Voting', function () {

  // load the service's module
  beforeEach(module('DrrmobileApp'));

  // instantiate service
  var Voting;
  beforeEach(inject(function (_Voting_) {
    Voting = _Voting_;
  }));

  it('should do something', function () {
    expect(!!Voting).toBe(true);
  });

});
