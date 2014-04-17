'use strict';

describe('Service: ProfileService', function () {

  // load the service's module
  beforeEach(module('DRRMobileApp'));

  describe('profile permissions', function() {
    // instantiate service
    var ProfileService,
        user,
        permissions;
    beforeEach(inject(function (_ProfileService_) {
      ProfileService = _ProfileService_;
      // Fixture data for permissions/relationships
      user = {
        "relation": { "self": true, "friends": false, "request_sent": false },
        "profile": {
          "settings": {
            "privacyProfileView": 0,
            "privacyPhotoView": 0,
            "privacyFriendsView": 0,
            "privacyGroupsView": 0,
            "privacyVideoView": 0
          }
        }
      };
      permissions = ProfileService.view_permissions(user);
    }));

    it('should return profile owner as true', function () {
      expect(permissions.relation.self).toBe(true);
    });

    it('should return friends as false', function() {
      expect(permissions.relation.friends).toBe(false);
    });

    it('should return profile access', function() {
      expect(permissions.settings.profileView).toEqual(0);
    });

    it('should set profile view if not found', function() {
      // Remove profile privacy level
      delete user.profile.settings.privacyProfileView;

      expect(permissions.settings.profileView).toEqual(0);
    });
  });
});
