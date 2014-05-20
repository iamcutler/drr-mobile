'use strict';

xdescribe('Service: Event', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var Event;
  beforeEach(inject(function (_EventService_) {
    Event = _EventService_;
  }));

  it('should do something', function () {
    expect(!!Event).toBe(true);
  });
});
