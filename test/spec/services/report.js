'use strict';

describe('Service: Report', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  // instantiate service
  var ReportService,
      httpBackend,
      endPoint,
      AuthService,
      fakeReport;

  beforeEach(inject(function($httpBackend, _endPoint_, _ReportService_, _AuthService_) {
    ReportService = _ReportService_;
    httpBackend = $httpBackend;
    endPoint = _endPoint_;
    AuthService = _AuthService_;

    // Set current user
    AuthService.set_user_session({
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      thumbnail: '',
      slug: '',
      hash: '6546516541651'
    });

    fakeReport = {
      category: 'Profile',
      message: 'Testing report',
      bug_type: 'mobile-app'
    };

    httpBackend.when("GET", "/views/layouts/default.html").respond(200, {});
    httpBackend.when("GET", "/views/news-feed/index.html").respond(200, {});
    httpBackend.when('GET', endPoint.api + '/user/feed_activity/0?user_hash=' + AuthService.current_user().hash).respond(200, {});

    httpBackend.flush();
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('report application bug', function () {
    httpBackend.when('POST', endPoint.api + '/report/bug').respond(200, { status: true });

    ReportService.bug(fakeReport, function(response) {
      expect(response.status).toEqual(true);
    });

    httpBackend.flush();
  });
});
