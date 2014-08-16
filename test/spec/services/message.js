'use strict';

describe('Service: Message', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  var rootScope,
      service,
      scope,
      httpBackend,
      AuthService,
      endPoint,
      fakeMessages;

  beforeEach(inject(function($rootScope, $httpBackend, _MessageService_, _AuthService_, _endPoint_) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    service = _MessageService_;
    httpBackend = $httpBackend;
    AuthService = _AuthService_;
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

    httpBackend.whenGET("/views/layouts/default.html").respond(200);
    httpBackend.whenGET("/views/news-feed/index.html").respond(200);
    httpBackend.whenGET(endPoint.api + "/user/feed_activity/0?user_hash=" + AuthService.current_user().hash).respond(200);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('user messages', function() {
    beforeEach(function() {
      fakeMessages = [{
        message: {
          bcc: 0,
          from: 821,
          id: 842,
          message: "Hhh",
          parent: 44,
          posted_on: "2014-05-15 22:40:35",
          read: 0,
          subject: "RE:One more thing",
          to: 819
        },
        user: {
          avatar: "images/avatar/dcfc7eb16ca54193073cf481.jpg",
          id: 821,
          name: "Dane Smith",
          slug: "821dane-smith",
          thumbnail: "images/avatar/thumb_dcfc7eb16ca54193073cf481.jpg",
          username: "danesmith"
        }
      }];

      httpBackend.expect('GET', endPoint.resourceApi + '/user/messages?user_hash=' + AuthService.current_user().hash).respond(200, fakeMessages);
    });

    it('returns messages collection', function() {
      service.user_messages().then(function(data) {
        expect(data).not.toBeNull();
      });
      httpBackend.flush();
    });

    it('returns first message user collection', function() {
      service.user_messages().then(function(data) {
        expect(data[0].user).toEqual(fakeMessages[0].user);
      });

      httpBackend.flush();
    });
  });

  describe('User message thread', function() {
    beforeEach(function() {
      fakeMessages = {
        messages: [{
          bcc: 0,
          from: 821,
          id: 819,
          is_read: 1,
          message: "Have you checked out our pinup contest?",
          posted_on: "2014-04-30 22:02:14",
          subject: "N/A",
          to: 3489,
          user_from: {
            avatar: "images/avatar/dcfc7eb16ca54193073cf481.jpg",
            id: "821",
            name: "Dane Smith",
            slug: "821dane-smith",
            thumbnail: "images/avatar/thumb_dcfc7eb16ca54193073cf481.jpg",
            username: "dane-smith"
          },
          user_to: {
            avatar: "images/avatar/698e7ce1f69c96143cbbe8b8.jpg",
            id: 3489,
            name: "John Doe",
            slug: "3489:john-doe",
            thumbnail: "images/avatar/thumb_698e7ce1f69c96143cbbe8b8.jpg",
            username: "john-doe"
          }
        }],
        status: true
      };

      httpBackend.expect('GET', endPoint.resourceApi + '/user/messages/819?user_hash=' + AuthService.current_user().hash).respond(200, fakeMessages);
    });

    it('returns successful status', function() {
      service.message_thread(819).then(function(response) {
        expect(response.status).toEqual(true);
      });

      httpBackend.flush();
    });

    it('returns 1 message thread', function() {
      service.message_thread(819).then(function(response) {
        expect(response.messages.length).toBe(1);
      });

      httpBackend.flush();
    });
  });

  describe('new message', function() {
    it('saves successfully', function() {
      httpBackend.expect('POST', endPoint.resourceApi + '/user/messages?user_hash=' + AuthService.current_user().hash).respond(200, { result: true });

      service.new_message('Testing new message').then(function(response) {
        expect(response.result).toEqual(true);
      });
      httpBackend.flush();
    });

    it('rejects new message', function() {
      httpBackend.expect('POST', endPoint.resourceApi + '/user/messages?user_hash=' + AuthService.current_user().hash).respond(200, { result: false });

      service.new_message('Testing new message').then(function(response) {
        expect(response.result).toEqual(false);
      });
      httpBackend.flush();
    });
  });
});
