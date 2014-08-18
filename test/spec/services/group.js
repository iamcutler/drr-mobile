'use strict';

describe('Service: GroupService', function () {
  var service,
      httpBackend,
      AuthService,
      endPoint,
      fakeGroups,
      group_one;

  beforeEach(module('DRRMobileApp'));

  beforeEach(inject(function(_GroupService_, _$httpBackend_, _AuthService_, _endPoint_) {
    service = _GroupService_;
    AuthService = _AuthService_;
    httpBackend = _$httpBackend_;
    endPoint = _endPoint_;

    // Set current user
    AuthService.set_user_session({
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      thumbnail: '',
      slug: '',
      hash: '6546516541651'
    });

    fakeGroups = [{
      activity: [],
      announcements: [],
      approvals: 0,
      avatar: "images/avatar/group/fc851c8d72396f946e058d63.jpg",
      category: "General",
      counts: {
        discussions: 0,
        members: 30
      },
      created: "2013-08-05 19:14:33",
      description: "<p>Everything Pinup related<\/p>",
      discussions: [],
      email: "",
      events: [],
      id: 1,
      members: [{
        approved: 1,
        avatar: "images/avatar/dcfc7eb16ca54193073cf481.jpg",
        name: "John Doe",
        permissions: 1,
        slug: "821john-doe",
        thumbnail: "images/avatar/thumb_dcfc7eb16ca54193073cf481.jpg"
      }],
      name: "Pinups",
      ownerid: 821,
      "params": {},
      "stats": {},
      "thumbnail": "images/avatar/group/thumb_fc851c8d72396f946e058d63.jpg",
      "website": ""
    }];

    httpBackend.whenGET('/views/layouts/default.html').respond(200);
    httpBackend.whenGET('/views/news-feed/index.html').respond(200);
    httpBackend.whenGET(endPoint.resourceApi + '/user/feed_activity/0?user_hash=' + AuthService.current_user().hash).respond(200, {});
  }));

  describe('Find group by id 1', function() {
    beforeEach(function() {
      httpBackend.whenGET(endPoint.resourceApi + '/user/groups/1?user_hash=' + AuthService.current_user().hash).respond(200, fakeGroups[0]);
      group_one = service.find_group(1);
    });

    afterEach(function() {
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('returns group with id 1', function() {
      group_one.then(function(response) {
        expect(response.id).toBe(1);
      });
    });

    it('returned group', function() {
      group_one.then(function(response) {
        expect(response).not.toBeNull();
      });
    });

    it('returns one member', function() {
      group_one.then(function(response) {
        expect(response.members.length).toBe(1);
      });
    });

    it('returns 30 members by count', function() {
      group_one.then(function(response) {
        expect(response.counts.members).toEqual(30);
      });
    });
  });
});
