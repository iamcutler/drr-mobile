'use strict';

xdescribe('Service: GroupService', function () {
  var $rootScope, $httpBackend, mockGroupResource, deferred;

  beforeEach(module('DRRMobileApp'));

  beforeEach(inject(function(GroupService, $injector, $q) {
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    //mockGroupResource = $injector.get('GroupService');

    deferred = $q.defer();
    deferred.resolve({id: 1});
    spyOn(GroupService, 'find_group').andReturn(deferred.promise);
  }));

  it('should return group by id', function(GroupService) {
    /*$httpBackend.whenGET('/user/groups/1?user_hash=b567b3a9b7983034e99d73d3064b7fe8d6bc7ecec73551173').respond({
      id: 1
    });*/

    GroupService.find_group(1).then(function(response) {
      result = response;
    });

    $rootScope.$apply();
    $httpBackend.flush();
    expect(result).not.toBeNull();
  });

});
