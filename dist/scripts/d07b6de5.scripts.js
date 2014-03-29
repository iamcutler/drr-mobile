"use strict";var app=angular.module("DRRMobileApp",["ngCookies","ngResource","ngSanitize","ui.router","angularMoment","infinite-scroll","ui.bootstrap","angularFileUpload","env-constants"],function(a){a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8",a.defaults.transformRequest=[function(a){var b=function(a){var c,d,e,f,g,h,i,j="";for(c in a)if(d=a[c],d instanceof Array)for(i=0;i<d.length;++i)g=d[i],e=c+"["+i+"]",h={},h[e]=g,j+=b(h)+"&";else if(d instanceof Object)for(f in d)g=d[f],e=c+"["+f+"]",h={},h[e]=g,j+=b(h)+"&";else void 0!==d&&null!==d&&(j+=encodeURIComponent(c)+"="+encodeURIComponent(d)+"&");return j.length?j.substr(0,j.length-1):j};return angular.isObject(a)&&"[object File]"!==String(a)?b(a):a}]});app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){c.html5Mode(!0),b.otherwise("/feed"),a.state("default",{"abstract":!0,controller:"ApplicationController",templateUrl:"/views/layouts/default.html"}).state("auth",{"abstract":!0,controller:"ApplicationController",templateUrl:"/views/layouts/auth.html"}).state("login",{parent:"auth",url:"/login",controller:"AuthController",templateUrl:"/views/auth/login.html",access:{require_user:!1,allowLoggedIn:!1}}).state("registeration",{parent:"auth",url:"/register",controller:"AuthController",templateUrl:"/views/auth/register.html",access:{require_user:!1,allowLoggedIn:!1}}).state("logout",{parent:"default",url:"/logout",controller:"AuthController",templateUrl:"/views/auth/logout.html",access:{require_user:!0}}).state("feed",{parent:"default",url:"/feed",controller:"FeedController",templateUrl:"/views/news-feed/index.html",access:{require_user:!0},resolve:{feed:function(a){return a.news_feed(0)}}}).state("messages",{parent:"default",url:"/messages",controller:"MessagesController",templateUrl:"/views/messages/index.html",access:{require_user:!0},resolve:{messages:function(a){return a.user_messages()}}}).state("messages.thread",{parent:"default",url:"/messages/:id",controller:"MessagesController",templateUrl:"/views/messages/thread.html",access:{require_user:!0},resolve:{messages:function(a,b){return b.message_thread(a.id)}}}).state("friend-requests",{parent:"default",url:"/requests",controller:"RequestsController",templateUrl:"/views/friend-requests/index.html",access:{require_user:!0},resolve:{requests:function(a){return a.requests()}}}).state("profile",{parent:"default",url:"/profile/:slug",controller:"ProfileController",templateUrl:"/views/profile/index.html",access:{require_user:!0},resolve:{profile:function(a,b){return b.getProfileData(a)},content:function(){}}}).state("profile.about",{parent:"default",url:"/profile/:slug/about",controller:"ProfileController",templateUrl:"/views/profile/about.html",access:{require_user:!0},resolve:{profile:function(a,b){return b.getProfileData(a)},content:function(a,b){return b.about_user(a)}}}).state("profile.friends",{parent:"default",url:"/profile/:slug/friends",controller:"ProfileController",templateUrl:"/views/profile/friends.html",access:{require_user:!0},resolve:{profile:function(a,b){return b.getProfileData(a)},content:function(a,b){return b.user_friends(a)}}}).state("profile.albums",{parent:"default",url:"/profile/:slug/photo_albums",controller:"ProfileController",templateUrl:"/views/profile/albums.html",access:{require_user:!0},resolve:{profile:function(a,b){return b.getProfileData(a)},content:function(a,b){return b.user_albums(a)}}}).state("profile.albums.photos",{parent:"default",url:"/profile/:slug/album/:id",controller:"ProfileController",templateUrl:"/views/profile/photos.html",access:{require_user:!0},resolve:{profile:function(a,b){return b.getProfileData(a)},content:function(a,b){return b.album_photos(a)}}}).state("profile.photo",{parent:"default",url:"/profile/:slug/photo/:id",controller:"ProfileController",templateUrl:"/views/profile/photo.html",access:{require_user:!0},resolve:{profile:function(){},content:function(a,b){return b.photo(a)}}}).state("profile.videos",{parent:"default",url:"/profile/:slug/videos",controller:"ProfileController",templateUrl:"/views/profile/videos.html",access:{require_user:!0},resolve:{profile:function(a,b){return b.getProfileData(a)},content:function(a,b){return b.user_videos(a)}}}).state("profile.video",{parent:"default",url:"/profile/:slug/video/:id",controller:"ProfileController",templateUrl:"/views/profile/video.html",access:{require_user:!0},resolve:{profile:function(){},content:function(a,b){return b.user_video(a)}}}).state("profile.events",{parent:"default",url:"/profile/:slug/events",controller:"ProfileController",templateUrl:"/views/profile/events.html",access:{require_user:!0},resolve:{profile:function(a,b){return b.getProfileData(a)},content:function(a,b){return b.user_events(a)}}}).state("profile.groups",{parent:"default",url:"/profile/:slug/groups",controller:"ProfileController",templateUrl:"/views/profile/groups.html",access:{require_user:!0},resolve:{profile:function(a,b){return b.getProfileData(a)},content:function(a,b){return b.user_groups(a)}}}).state("group",{parent:"default",url:"/groups/:id",controller:"GroupController",templateUrl:"/views/groups/index.html",access:{require_user:!0},resolve:{group:function(a,b){return b.find_group(a.id)}}}).state("event",{parent:"default",url:"/events/:id",controller:"EventsController",templateUrl:"/views/events/index.html",access:{require_user:!0},resolve:{event:function(a,b){return b.find_event(a.id)}}}).state("event.search",{parent:"default",url:"/search-events",controller:"EventsController",templateUrl:"/views/events/search.html",access:{require_user:!0}}).state("activity",{parent:"default",url:"/activity/:id",controller:"ActivityController",templateUrl:"/views/activity/index.html",access:{require_user:!0},resolve:{activity:function(a,b){return b.find(a.id)}}}).state("media",{parent:"default",url:"/media",controller:"MediaController",templateUrl:"/views/media/index.html",access:{require_user:!0},resolve:{media:function(a){return a.media(0)}}}).state("dirty-girls",{parent:"default",url:"/dirty-girls",controller:"DirtyGirlsController",templateUrl:"/views/dirty-girls/index.html",access:{require_user:!0},resolve:{dirty_girls:function(a){return a.get_dirty_girls()}}}).state("dirty-girl-page",{parent:"default",url:"/dirty-girl/:id",controller:"DirtyGirlsController",templateUrl:"/views/dirty-girls/page.html",access:{require_user:!0},resolve:{dirty_girls:function(a,b){return b.get_girl_by_id(a.id)}}}).state("dirty-submission",{parent:"default",url:"/dirty-submission",controller:"DirtyGirlsController",templateUrl:"/views/dirty-girls/submission.html",access:{require_user:!0},resolve:{dirty_girls:function(){}}}).state("vote",{parent:"default",url:"/vote",controller:"VotingController",templateUrl:"/views/voting/vote.html",access:{require_user:!0},resolve:{votes:function(a){return a.get_current_polling()}}}).state("vote-results",{parent:"default",url:"/vote/results",controller:"VotingController",templateUrl:"/views/voting/results.html",access:{require_user:!0},resolve:{votes:function(a){return a.get_current_polling()}}}).state("report-bug",{parent:"default",url:"/report",controller:"ReportController",templateUrl:"/views/report/bug.html",access:{require_user:!0}}).state("account-settings",{parent:"default",url:"/preferences",controller:"UserController",templateUrl:"/views/account/settings.html",access:{require_user:!0},resolve:{account:function(a){return a.account_settings()}}}).state("profile404",{parent:"default",url:"/error/profile/404",controller:"ProfileController",templateUrl:"/views/profile/404.html",access:{require_user:!0}})}]),app.run(["$rootScope",function(a){a.$on("$stateChangeStart",function(b,c){c.resolve&&(a.loadingView=!0)}),a.$on("$stateChangeSuccess",function(){a.loadingView=!1})}]),angular.module("env-constants",[]).constant("environment","production").constant("endPoint",{api:"http://api.dirtyrottenrides.com",resourceApi:"http://api.dirtyrottenrides.com",cdn:"http://cdn.dirtyrottenrides.com"}).constant("imgPlaceholder","img_placeholder.png").constant("sessionStore","_starqle_session"),app.run(["$rootScope","$state","$stateParams",function(a,b,c){a.$debugMode="on",a.$state=b,a.$stateParams=c}]),Date.prototype.yyyymmdd=function(){var a=this.getFullYear().toString(),b=(this.getMonth()+1).toString(),c=this.getDate().toString();return a+"-"+(b[1]?b:"0"+b[0])+"-"+(c[1]?c:"0"+c[0])},app.controller("ApplicationController",["$scope","$state","$cookies","endPoint","imgPlaceholder","AuthService",function(a,b,c,d,e,f){a.cdnDomain=d.cdn,a.imgPlaceholder=e,f.check_user_access(),a.current_user=f.current_user(),c["XSRF-TOKEN"]="my_token",void 0===f.current_user().hash&&b.go("login")}]),app.controller("FeedController",["$scope","$state","ActivityService","feed",function(a,b,c,d){var e=function(a){angular.forEach(a,function(a){a.created=moment.utc(a.created).local()})};"feed"==b.current.name&&(a.title="News Feed",a.pageCounter=10,a.feed=d,a.disabledScroll=!1,a.busy=!1,e(a.feed),a.news_feed={load:function(){if(!a.disabledScroll){a.busy=!0;var b=c.news_feed(a.pageCounter);b.then(function(b){b.length>0?(angular.forEach(b,function(b){a.feed.push(b)}),a.pageCounter+=10):a.disabledScroll=!0,a.busy=!1},function(a){console.error(a)})}}})}]),app.controller("ProfileController",["$scope","$state","$stateParams","$location","$modal","AuthService","ProfileService","WallService","profile","content",function(a,b,c,d,e,f,g,h,i,j){a.profile=i;var k=function(a){a.created=moment.utc(a.created).local(),angular.forEach(a.comments,function(b,c){a.comments[c].date=moment.utc(a.comments[c].date).local()})};"profile"==b.current.name&&(a.title=a.profile.user.name,a.feedCounter=10,a.disabledScroll=!1,a.busy=!1,angular.forEach(a.profile.profile.feed,function(b,c){a.profile.profile.feed[c].created=moment.utc(a.profile.profile.feed[c].created).local()}),a.newMessage=function(){e.open({templateUrl:"views/messages/new-message.modal.html",controller:"ModalController",scope:a,resolve:{user:function(){return a.profile.user}}})},a.feed={load:function(){if(!a.disabledScroll&&!a.busy){a.busy=!0;var b=g.feed(c.slug,a.feedCounter);b.then(function(b){b.length>0?(angular.forEach(b,function(b){a.profile.profile.feed.push(b)}),a.feedCounter+=10):a.disabledScroll=!0,a.busy=!1},function(a){console.error(a)})}}}),"profile.about"==b.current.name&&(a.title="About "+a.profile.user.name,a.about_user=j),"profile.friends"==b.current.name&&(a.title=a.profile.user.name+"'s friends",a.friends=j,a.nameLabel=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]),"profile.albums"==b.current.name&&(a.title=a.profile.user.name+"'s albums",a.albums=j),"profile.albums.photos"==b.current.name&&(a.title=j.name,a.photos=j,("40"==j.permission&&1!=i.relation.self||0==j.album_owner)&&window.history.back()),"profile.videos"==b.current.name&&(a.title=a.profile.user.name+"'s videos",a.videos=j),"profile.video"==b.current.name&&(a.title="Video",a.video=j,a.new_comment={cid:a.video.id,app:a.video.comment_type,user:f.current_user().id},k(a.video)),"profile.photo"==b.current.name&&(a.title="Photo",a.photo=j,a.new_comment={cid:a.photo.id,app:a.photo.comment_type,user:f.current_user().id},k(a.photo)),"profile.events"==b.current.name&&(a.title=a.profile.user.name+"'s events",a.events=j),"profile.groups"==b.current.name&&(a.title=a.profile.user.name+"'s groups",a.groups=j),a.composeComment=function(a,b,c){if(a.$valid){var d=h.save(c);d.then(function(a){a.result&&(b.unshift({id:a.wall.id,type:a.wall.type,comment:a.wall.comment,date:moment.utc(a.wall.date).local(),stats:{likes:0,dislikes:0},user:{id:a.wall.user.id,name:a.wall.user.name,thumbnail:a.wall.user.thumbnail,avatar:a.wall.user.avatar,slug:a.wall.user.slug}}),c.comment=""),console.log(a)},function(a){console.error(a)})}}}]),app.controller("ReportController",["$scope","$state","$location","ReportService",function(a,b,c,d){"report-bug"==b.current.name&&(a.title="Report a Problem",a.reportSubmitted=!1,a.reportError="",a.reportSuccess=!1,a.report={options:{news_feed:"News Feed",friend_requests:"Friend Requests",my_messages:"My Messages",profile:"My Profile",events:"Upcoming Events",media:"Media",notifications:"Notifications",dirty_girls:"Dirty Girls",dirty_voting:"Dirty Girl Voting",account_settings:"Account Settings"},bug:{type:"mobile-app"}},a.submitBug=function(b){b.$valid?d.bug(a.report.bug,function(b){b.status&&(a.reportSuccess=!0)}):a.reportSubmitted=!0})}]),app.controller("RequestsController",["$scope","$state","requests",function(a,b,c){"friend-requests"==b.current.name&&(a.title="Friend Requests",a.requests=c)}]),app.controller("MediaController",["$scope","$state","media","ActivityService",function(a,b,c,d){var e=function(a){angular.forEach(a,function(a){a.created=moment.utc(a.created).local()})};"media"==b.current.name&&(a.title="Media",a.media=c,a.media_counter=10,a.busy=!1,a.feedDisabled=!1,e(a.media),a.feed={load:function(){if(!a.feedDisabled){a.busy=!0;var b=d.media(a.media_counter);b.then(function(b){0==a.busy,b.length>0?(e(b),angular.forEach(b,function(b){a.media.push(b)})):a.feedDisabled=!0},function(a){console.error(a)})}}}),"activity"==b.current.name&&(a.title="Media Post")}]),app.controller("MessagesController",["$scope","$state","$stateParams","$location","$anchorScroll","messages","MessageService","AuthService",function(a,b,c,d,e,f,g,h){"messages"==b.current.name&&(a.title="My Messages",a.messages=f,angular.forEach(a.messages,function(a){a.message.posted_on=moment.utc(a.message.posted_on).local()})),"messages.thread"==b.current.name&&(a.recepient=f.messages[0].from==h.current_user().id?f.messages[0].to:f.messages[0].from,a.new_msg={user:h.current_user().id,recepient:a.recepient,parent:c.id},a.thread=f,angular.forEach(a.thread.messages,function(a){a.posted_on=moment.utc(a.posted_on).local()}),a.user_id=h.current_user().id,a.scrollTo=function(a){d.hash(a),e()},a.processNewMessage=function(b){b.$valid&&g.new_message(a.new_msg).then(function(){a.thread.messages.unshift({message:a.new_msg.message,from:a.new_msg.user,to:a.new_msg.recepient,thumbnail:h.current_user().thumbnail,posted_on:moment.utc(new Date).local()}),a.new_msg.message="",a.scrollTo("topThread"),a.thread=f},function(){console.error("Error saving new message")})})}]),app.controller("EventsController",["$scope","$state","EventService","AuthService","ActivityService","event",function(a,b,c,d,e,f){if(b.current.name="event"){a.title=f.event.title,a.event=f,a.busy=!1,a.activity_counter=10,a.new_activity={event_id:f.event.id,actor:d.current_user().id,app:"events.wall"},a.event.event.start_date=new Date(a.event.event.start_date),a.event.event.end_date=new Date(a.event.event.end_date),a.event.event.created=new Date(a.event.event.created);var g=function(a){angular.forEach(a,function(a){a.created=moment.utc(a.created).local(),angular.forEach(a.comments,function(a){a.created=moment.utc(a.created).local()})})};g(a.event.activity),a.is={member:function(){var b=!1;return angular.forEach(a.event.event.members,function(a){a.id==d.current_user().id&&(b=!0)}),b},attending:function(){var b=!1;return angular.forEach(a.event.event.members,function(a){a.id==d.current_user().id&&1==a.status&&(b=!0)}),b},admin:function(){var b=!1;return angular.forEach(a.event.event.members,function(a){a.id==d.current_user().id&&1==a.permission&&(b=!0)}),b}},a.feed={load:function(){var b=c.activity(a.event.event.id,a.activity_counter);b.then(function(b){angular.forEach(b,function(b){a.event.activity.push(b)}),b.length>0&&(a.activity_counter+=10),a.busy=!1})},"new":function(b){if(b.$valid){var c=e.new(a.new_activity);c.then(function(b){a.new_activity.message="",a.event.activity.unshift(b.activity[0]),g(a.event.activity)},function(){})}}}}}]),app.controller("AuthController",["$scope","$state","$location","$cookieStore","AuthService",function(a,b,c,d,e){"registeration"==b.current.name&&(a.register={},a.registerSubmitted=!1,a.registerErrors=!1,a.usernameTaken=!1,a.check_username_uniqueness=function(){console.log("check username"),e.check_username_uniqueness(a.register.username,function(b){b.unique?(a.usernameTaken=!1,$("input[name='username']").css({background:"#FFF",color:"#555"})):(a.usernameTaken=!0,$("input[name='username']").css({background:"#F00",color:"#000"}))})},a.processRegistration=function(b){a.registerSubmitted=!0,b.$valid&&e.register(a.register,function(b){b.status?(e.set_user_session(b),console.log("Registered user successfully"),c.path("/feed")):(a.registerErrors=!0,$("div.alert.register-errors").html(b.message),console.log(b))})}),"login"==b.current.name&&(a.login={},a.loginSubmitted=!1,a.loginError="",a.processLogin=function(b){b.$valid?e.login(a.login,function(b){b.status?(e.set_user_session(b.user),c.path("/feed")):a.loginError="wrong username and/or password. please try again."}):a.loginSubmitted=!0}),"logout"==b.current.name&&(e.clear_user_session(),e.logout())}]),app.controller("VotingController",["$scope","$state","$location","votes",function(a,b,c,d){"vote"==b.current.name&&(a.voting=d,a.$watch("voting",function(){a.title=0!=a.voting.length?a.voting.poll.question:"Poll Coming Soon"})),"vote-results"==b.current.name&&(a.title="Current Poll Results",a.voting=d,a.$watch("voting",function(){0==a.voting.length&&c.path("/vote")}),a.predicate="-votes")}]),app.controller("DirtyGirlsController",["$scope","$state","$stateParams","dirty_girls",function(a,b,c,d){"dirty-girls"==b.current.name&&(a.title="Dirty Girls",a.dirty_girls=d),"dirty-girl-page"==b.current.name&&(a.title=d.name,a.dirty_girl=d),"dirty-submission"==b.current.name&&(a.title="Dirty Girl Submission",a.submissionSubmitted=!1,a.submissionError=!1,a.submissionErrorMsg="",a.submission={entry:{agree:{}},submit:function(b){a.submissionSubmitted=!0,b.$valid?console.log(a.submission.entry):a.submissionError=!0}})}]),app.directive("toggleDirtyGirls",function(){return{restrict:"E",link:function(a,b,c){b.bind("click",function(){$("section.dirty-girls-of-the-month, section.dirty-girls-crew").hide(),"monthly"==c.category?$("section.dirty-girls-of-the-month").show():$("section.dirty-girls-crew").show()})}}}),app.directive("toggleNavigation",function(){return function(a,b){$(b).click(function(){var a=$("#app-container"),c=$(document).width(),d=400,e=0;b.hasClass("showNavi")?(e=0,b.removeClass("showNavi")):(e=c-64,b.addClass("showNavi")),a.animate({left:e+"px"},d)})}}),app.directive("navigationItem",function(){return{restrict:"E",scope:{ngHref:"@",icon:"@",title:"@"},template:'<a ng-href="{{ ngHref }}" class="menu-link"><div class="menu-icon">{{ icon }}</div>{{ title }}</a>',link:function(a,b){b.bind("click",function(){$("#app-container").animate({left:"0px"},400),$("button.navbar-toggle").removeClass("showNavi")})}}}),app.directive("navigationUser",function(){return{restrict:"E",scope:{ngHref:"@",name:"@",thumbnail:"@"},template:'<a ng-href="{{ ngHref }}"><div class="thumb"><img ng-src="{{ thumbnail }}" /></div><span>{{ name }}</span></a>',link:function(a,b){b.bind("click",function(){$("#app-container").animate({left:"0px"},400),$("button.navbar-toggle").removeClass("showNavi")})}}}),app.directive("pageIcon",function(){return{restrict:"E",scope:{icon:"@",message:"@"},template:'<div class="page-icon"><div class="clearfix">{{ icon }}</div>{{ message }}</div>'}}),app.directive("toggleEventNav",function(){return function(a,b,c){b.bind("click",function(){$("section[id^=event-]").hide(),$("section#event-"+c.target).show()})}}),app.directive("toggleGroupNav",function(){return function(a,b,c){b.bind("click",function(){$("section[id^=group-]").hide(),$("section#group-"+c.target).show()})}}),app.factory("DirtyGirlsService",["$resource","$q","endPoint","AuthService",function(a,b,c,d){var e=a(c.resourceApi+"/dirty-girls/:id",{user_hash:d.current_user().hash},{get:{method:"get",cache:!0}});return{get_dirty_girls:function(){var a=b.defer();return e.query({},function(b){a.resolve(b)},function(){a.reject()}),a.promise},get_girl_by_id:function(a){var c=b.defer();return e.get({id:a},function(a){c.resolve(a)},function(){c.reject()}),c.promise}}}]),app.factory("ProfileService",["$http","$q","endPoint","AuthService",function(a,b,c,d){return{getProfileData:function(e){var f=b.defer();return a.get(c.api+"/user/profile/"+e.slug+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(){f.reject()}),f.promise},about_user:function(e){var f=b.defer();return a.get(c.api+"/user/profile/about/"+e.slug+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(){f.reject("Error fetching profile about user data")}),f.promise},user_friends:function(e){var f=b.defer();return a.get(c.api+"/user/profile/friends/"+e.slug+"?user_hash="+d.current_user().hash,{cache:!0}).success(function(a){f.resolve(a)}).error(function(){f.reject(),console.error("Error fetching profile service: User friends")}),f.promise},user_albums:function(e){var f=b.defer();return a.get(c.api+"/user/profile/albums/"+e.slug+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(){f.reject(),console.error("Error fetching profile service: User photo albums")}),f.promise},album_photos:function(e){var f=b.defer();return a.get(c.api+"/user/profile/album/"+e.slug+"/"+e.id+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(){f.reject(),console.error("Error fetching profile service: User photos")}),f.promise},user_videos:function(e){var f=b.defer();return a.get(c.api+"/user/profile/videos/"+e.slug+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(){console.error("Error fetching profile service: User videos")}),f.promise},user_video:function(e){var f=b.defer();return a.get(c.api+"/user/profile/video/"+e.slug+"/"+e.id+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(){console.error("Error fetching profile service: User video")}),f.promise},user_groups:function(e){var f=b.defer();return a.get(c.api+"/user/profile/groups/"+e.slug+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(){console.error("Error fetching profile service: user groups"),f.reject()}),f.promise},user_events:function(e){var f=b.defer();return a.get(c.api+"/user/profile/events/"+e.slug+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(){console.error("Error fetching profile service: user_events"),f.reject()}),f.promise},feed:function(e,f){var g=b.defer();return a.get(c.api+"/user/feed_activity/profile/"+e+"/"+f+"?user_hash="+d.current_user().hash).success(function(a){g.resolve(a)}).error(function(){g.reject("Error fetching profile service: feed")}),g.promise},photo:function(e){var f=b.defer();return a.get(c.api+"/user/profile/photo/"+e.slug+"/"+e.id+"?user_hash="+d.current_user().hash).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise}}}]),app.factory("AuthService",["$http","$rootScope","$cookieStore","$state","endPoint",function(a,b,c,d,e){return{login:function(b,c){a.post(e.api+"/user/login",b).success(function(a){"function"==typeof c&&c(a)}).error(function(){})},logout:function(){c.remove("user_hash"),c.put("isLoggedIn",!1),d.go("login")},check_username_uniqueness:function(b,c){a.post(e.api+"/check/username/"+b,{}).success(function(a){"function"==typeof c&&c(a)}).error(function(){})},register:function(b,c){a.post(e.api+"/user",b).success(function(a){"function"==typeof c&&c(a)}).error(function(){})},check_user_access:function(){d.current.access.require_user&&void 0===c.get("user_hash")&&d.go("login"),d.current.access.require_user||d.current.access.allowLoggedIn||void 0===c.get("user_hash")||d.go("feed")},current_user:function(){return{id:c.get("user_id"),name:c.get("user_name"),username:c.get("username"),thumbnail:c.get("user_thumbnail"),slug:c.get("user_slug"),hash:c.get("user_hash")}},set_user_session:function(a){console.log(a),c.put("user_id",a.id),c.put("user_name",a.name),c.put("username",a.username),c.put("user_thumbnail",a.thumbnail),c.put("user_slug",a.slug),c.put("user_hash",a.hash),c.put("isLoggedIn",!0)},clear_user_session:function(){c.remove("user_name"),c.remove("username"),c.remove("user_thumbnail"),c.remove("user_slug"),c.remove("user_hash"),c.remove("isLoggedIn")}}}]),app.factory("VotingService",["$resource","$q","endPoint","AuthService",function(a,b,c,d){var e=a(c.resourceApi+"/dirty-girls/voting/current",{user_hash:d.current_user().hash});return{get_current_polling:function(){var a=b.defer();return e.get({},function(b){a.resolve(b)},function(){a.reject()}),a.promise},cast_vote:function(a,b,c){var d=e.get({},function(){d.id_answer=b,d.$save(function(a){c(a)})})}}}]),app.directive("castVote",["$location","VotingService",function(a,b){return{restrict:"E",scope:{poll:"@",answer:"@"},template:'<button type="button" class="btn btn-lg btn-default" ng-poll-id="{{ poll }}" ng-answer="{{ answer }}">Vote</button>',link:function(c,d,e){d.click(function(){$("ul.voting-options li div.vote-action button").attr("disabled","disabled"),d.children("button").addClass("loading"),console.log("Calling voting service"),b.cast_vote(e.poll,e.answer,function(){a.path("/vote/results")})})}}}]),app.factory("ReportService",["$http","$rootScope","endPoint","AuthService",function(a,b,c,d){return{bug:function(b,e){console.log({user_hash:d.current_user().hash,category:b.category,message:b.message,bug_type:b.type}),a.post(c.api+"/report/bug",{user_hash:d.current_user().hash,category:b.category,message:b.message,bug_type:b.type}).success(function(a){"function"==typeof e&&e(a)}).error(function(){console.error("Error sending bug report")})}}}]),app.directive("sendReport",function(){return{restrict:"A",link:function(a,b){b.click(function(){a.$watch("reportBug.$valid",function(a){a?b.attr("disabled","disabled"):b.attr("disabled",!1)})})}}}),app.controller("UserController",["$scope","$state","UserService","account",function(a,b,c,d){(b.current.name="account-settings")&&(a.title="Account Settings",a.settings=d,a.perferences={},a.submitSuccess=!1,a.saveSettings=function(b){if(b.$valid){$("button").prop("disabled",!0),angular.forEach(a.settings,function(b,c){a.perferences[c]={id:b.id,value:b.value.value,access:b.value.access}});var d=c.update_account_settings(a.perferences);d.then(function(b){a.submitSuccess=!0,$("button").prop("disabled",!1),console.log(b),a.statusMsg=b.status?"Successfully saved account perferences.":"Error saving account perferences."})}})}]),app.factory("UserService",["$http","$q","endPoint","AuthService",function(a,b,c,d){return{account_settings:function(){var e=b.defer();return a.get(c.api+"/user/account/settings?user_hash="+d.current_user().hash).success(function(a){e.resolve(a)}).error(function(){e.reject("Error fetching account settings")}),e.promise},update_account_settings:function(e){var f=b.defer();return a({method:"POST",url:c.api+"/user/account/settings",data:{settings:e,user_hash:d.current_user().hash}}).success(function(a){f.resolve(a)}).error(function(){f.reject("Error updating account settings")}),f.promise},remove_friend:function(e){var f=b.defer();return a({method:"DELETE",url:c.api+"/user/connections/remove/"+e+"?user_hash="+d.current_user().hash}).success(function(a){f.resolve(a)}).error(function(){f.reject("Can't remove user connection")}),f.promise}}}]),app.service("RequestService",["$resource","$q","endPoint","AuthService",function(a,b,c,d){var e=a(c.resourceApi+"/user/connections/:id",{id:"@id",user_hash:d.current_user().hash},{update:{method:"PUT"}});return{requests:function(){var a=b.defer();return e.query({},function(b){a.resolve(b)},function(){a.reject()}),a.promise},send:function(a){var c=b.defer();return e.save({user:a},function(a){c.resolve(a)},function(){c.reject("Error saving new friend request")}),c.promise},accept:function(a,b){e.update({id:a},function(a){"function"==typeof b&&b(a)},function(){console.log("Error accepting friend request")})},decline:function(a,b){e.delete({id:a},function(a){"function"==typeof b&&b(a)})}}}]),app.directive("friendRequest",["RequestService",function(a){return{restrict:"A",link:function(b,c,d){c.click(function(){var b=d.request,e=d.action;void 0!=b&&void 0!=e&&(c.attr("disabled","disabled"),"accept"==e?a.accept(b,function(){c.parent().parent().parent().parent().fadeOut()}):"decline"==e&&a.decline(b,function(){c.parent().parent().parent().parent().fadeOut()}))})}}}]),app.directive("sendFriendRequest",["RequestService",function(a){return{restrict:"A",scope:{target:"@"},link:function(b,c){c.bind("click",function(){c.prop("disabled",!0);var d=a.send(b.target);d.then(function(a){a.result?c.text("Request Sent"):c.text("Unable to send")},function(a){c.prop("disabled",!0),console.error(a)})})}}}]),app.directive("removeFriend",["UserService",function(a){return{restrict:"A",scope:{target:"@"},link:function(b,c){c.bind("click",function(){confirm("Are you sure you want to remove this user as a friend?")&&angular.isDefined(b.target)&&(c.prop("disabled",!0),a.remove_friend(b.target).then(function(a){a.result?c.text("Friend Removed"):c.text("Removal Failed")}))})}}}]),app.directive("newStatus",["$modal","EventService","AuthService",function(a,b,c){return{restrict:"A",scope:"@",link:function(b,d){d.bind("click",function(){a.open({templateUrl:"/views/profile/status/new-status.modal.html",controller:"ModalController",scope:b,resolve:{user:function(){return c.current_user()}}})})}}}]),app.directive("toggleStatusType",function(){return{restrict:"A",scope:{status:"@"},link:function(a,b){b.bind("click",function(){$("#status-navigation button").removeClass("btn-primary").addClass("btn-default"),b.removeClass("btn-default").addClass("btn-primary"),$("[id$=-status]").hide(),$("#"+a.status+"-status").show()})}}}),app.directive("eventLength",function(){return{restrict:"A",link:function(a,b){b.bind("change",function(){1==b.val()?($("#eventStartTime, #eventEndTime").hide(),$("#eventStartDate, #eventEndDate").removeClass().addClass("col-xs-10")):($("#eventStartTime, #eventEndTime").show(),$("#eventStartDate, #eventEndDate").removeClass().addClass("col-xs-5"))})}}}),app.directive("eventRepeat",function(){return{restrict:"A",link:function(a,b){b.bind("change",function(){""==b.val()?($("#repeat-end").hide(),b.parent().removeClass().addClass("col-xs-10")):($("#repeat-end").show(),b.parent().removeClass().addClass("col-xs-5"))})}}}),app.factory("MessageService",["$resource","$q","endPoint","AuthService",function(a,b,c,d){var e=a(c.resourceApi+"/user/messages/:id",{id:"@id",user_hash:d.current_user().hash});return{user_messages:function(){var a=b.defer();return e.query({},function(b){a.resolve(b)},function(){a.reject()}),a.promise},message_thread:function(a){var c=b.defer();return e.get({id:a},function(a){c.resolve(a)},function(){c.reject()}),c.promise},new_message:function(a){var c=b.defer();return e.save(a,function(a){c.resolve(a)},function(){c.reject()}),c.promise}}}]),app.filter("substr",function(){return function(a,b,c){return a.length>c?a.substr(b,c)+"...":a}}),app.filter("MessageStructure",function(){return function(a,b){return a==b?"right":null}}),app.filter("strip_html_tags",function(){return function(a){return String(a).replace(/<[^>]+>/gm,"")}}),app.factory("GroupService",["$resource","$q","endPoint","AuthService",function(a,b,c,d){var e=a(c.resourceApi+"/user/groups/:id",{id:"@id",user_hash:d.current_user().hash});return{find_group:function(a){var c=b.defer();return e.get({id:a},function(a){c.resolve(a)},function(){console.error("Error fetching group service: find_group"),c.reject()}),c.promise}}}]),app.controller("GroupController",["$scope","$state","$stateParams","$location","group",function(a,b,c,d,e){"group"==b.current.name&&(a.title=e.name.substr(0,50),a.group=e,a.group.created=moment.utc(a.group.created).local())}]),app.service("EventService",["$http","$resource","$q","endPoint","AuthService",function(a,b,c,d,e){var f=b(d.resourceApi+"/user/events/:id",{id:"@id",user_hash:e.current_user().hash});
return{find_event:function(a){var b=c.defer();return f.get({id:a},function(a){b.resolve(a)},function(){console.error("Error fetching events service: find_event"),b.reject()}),b.promise},activity:function(b,f){var g=c.defer();return a.get(d.api+"/user/feed_activity/event?id="+b+"&offset="+f+"&user_hash="+e.current_user().hash).success(function(a){g.resolve(a)}).error(function(){g.reject(),console.error("Error fetching event activity")}),g.promise},categories:function(){return a.get(d.api+"/user/feed_activity/event-categories?user_hash="+e.current_user().hash)}}}]),app.factory("LikeService",["$rootScope","$http","$q","endPoint","AuthService",function(a,b,c,d,e){return{like:function(a,f){var g=c.defer();return b.post(d.api+"/user/like/like/"+a+"/"+f+"/1/?user_hash="+e.current_user().hash).success(function(a){g.resolve(a)}).error(function(){console.error("Error saving this like."),g.reject()}),g.promise},dislike:function(a,f){var g=c.defer();return b.post(d.api+"/user/like/like/"+a+"/"+f+"/0/?user_hash="+e.current_user().hash).success(function(a){g.resolve(a)}).error(function(){console.error("Error saving this dislike."),g.reject()}),g.promise}}}]),app.directive("likeThis",["LikeService",function(a){return{restrict:"A",scope:{model:"=",element:"@",id:"@",like:"@"},replace:!0,link:function(b,c){c.bind("click",function(){var c=1==b.like?a.like(b.element,b.id):a.dislike(b.element,b.id);c.then(function(a){b.model.stats.likes=a.like.likes,b.model.stats.dislikes=a.like.dislikes})})}}}]),app.directive("eventAttendance",["ActivityService",function(a){return{restrict:"A",scope:{target:"@"},link:function(b,c){c.bind("change",function(){a.event_attendance(b.target)})}}}]),app.directive("removeActivity",["ActivityService",function(a){return{restrict:"A",scope:{model:"=",index:"@",app:"@",target:"@"},link:function(b,c){c.bind("click",function(){var c=a.delete(b.target,b.app);c.then(function(){b.model.splice(b.index,1)},function(a){console.error(a)})})}}}]),app.directive("removeWall",["WallService",function(a){return{restrict:"A",scope:{model:"=",target:"@",index:"@"},link:function(b,c){c.bind("click",function(){var c=a.delete(b.target);c.then(function(a){a.result&&b.model.splice(b.index,1)},function(a){console.error(a)})})}}}]),app.factory("ActivityService",["$http","$resource","$q","endPoint","AuthService",function(a,b,c,d,e){var f=b(d.resourceApi+"/user/activity/:id",{id:"@id",user_hash:e.current_user().hash},{});return{find:function(a){var b=c.defer();return f.get({id:a},function(a){b.resolve(a)},function(){b.reject("Can not find activity")}),b.promise},"new":function(a){var b=c.defer();return f.save(a,function(a){a.result?b.resolve(a):b.reject(a)},function(){b.reject("Error occuried while saving. Try again later.")}),b.promise},media_upload:function(b){a({method:"POST",url:d.api+"user/activity?user_hash="+e.current_user().hash,headers:{"Content-Type":!1},transformRequest:function(a){var b=new FormData;b.append("model",angular.toJson(a.model));for(var c=0;c<a.files;c++)b.append("file"+c,a.files[c]);return b},data:{model:b,files:b.file}}).success(function(a){console.log(a)}).error(function(a){console.log(a)})},event_attendance:function(b){var f=c.defer();return a.post(d.api+"/user/activity/event_attendance/"+b+"?user_hash="+e.current_user().hash).success(function(a){f.resolve(a)}).error(function(){f.reject("Error saving event attendance")}),f.promise},"delete":function(a,b){var d=c.defer();return f.delete({id:a,app:b},function(a){a.result?d.resolve(a):d.reject("Fetch removing activity")},function(){d.reject("Fetch removing activity")}),d.promise},media:function(b){var f=c.defer();return a.get(d.api+"/user/feed_activity/media/"+b+"?user_hash="+e.current_user().hash).success(function(a){f.resolve(a)}).error(function(){f.reject("Error fetching latest media")}),f.promise},news_feed:function(b){var f=c.defer();return a.get(d.api+"/user/feed_activity/"+b+"?user_hash="+e.current_user().hash).success(function(a){f.resolve(a)}).error(function(){f.reject("Error fetching latest media")}),f.promise}}}]),app.controller("ActivityController",["$scope","$state","activity","WallService","AuthService",function(a,b,c,d,e){a.composeComment=function(a,b,c){if(a.$valid){var e=d.save(c);e.then(function(a){a.result&&(b.unshift({id:a.wall.id,type:a.wall.type,comment:a.wall.comment,date:moment.utc(a.wall.date).local(),stats:{likes:0,dislikes:0},user:{id:a.wall.user.id,name:a.wall.user.name,thumbnail:a.wall.user.thumbnail,avatar:a.wall.user.avatar,slug:a.wall.user.slug}}),c.comment="")},function(a){console.error(a)})}};var f=function(a){a.created=moment.utc(a.created).local(),angular.forEach(a.comments,function(b,c){a.comments[c].date=moment.utc(a.comments[c].date).local()})};(b.current.name="activity")&&(a.title="",a.activity=c.activity,a.new_comment={cid:a.activity.comment_id,app:a.activity.comment_type,user:e.current_user().id},f(a.activity))}]),app.factory("WallService",["$resource","$q","endPoint","AuthService",function(a,b,c,d){var e=a(c.resourceApi+"/user/wall/:id",{id:"@id",user_hash:d.current_user().hash});return{save:function(a){var c=b.defer();return e.save(a,function(a){c.resolve(a)},function(){c.reject("Can't save new comment")}),c.promise},"delete":function(a){var c=b.defer();return e.delete({id:a},function(a){c.resolve(a)},function(){c.reject("Error removing comment.")}),c.promise}}}]),app.controller("ModalController",["$scope","$modalInstance","$upload","endPoint","ActivityService","MessageService","EventService","AuthService","user",function(a,b,c,d,e,f,g,h,i){a.user=i,a.statusError=!1,a.statusErrorMsg="",a.statusSubmitted=!1,a.photoProcessing=!1,a.uploadPercentage=0,a.newMessage={user:a.current_user.id,recepient:i.id,parent:0},a.new_status={text:{app:"status"},photo:{app:"photo-status"},video:{app:"video-status"},event:{app:"event-status"}},a.newTextStatus=function(c){if(c.$valid){$("form[name='"+c.$name+"'] button[type='submit']").prop("disabled",!0);var d=e.new(a.new_status.text);d.then(function(){a.statusError=!1,b.dismiss()},function(b){$("form[name='"+c.$name+"'] button[type='submit']").prop("disabled",!1),a.statusError=!0,a.statusErrorMsg=b})}},a.newPhotoStatus=function(e){var f=$("div#photo-status form[name='newPhotoStatusForm']"),g=$("div#photo-status .progress");f.hide(),g.show();for(var i=0;i<e.length;i++){var j=e[i];a.upload=c.upload({url:d.api+"/user/activity?user_hash="+h.current_user().hash,method:"POST",data:a.new_status.photo,file:j}).progress(function(b){a.uploadPercentage=parseInt(100*b.loaded/b.total)}).success(function(a){console.log(a),b.dismiss()}).error(function(){f.show(),g.hide()})}},a.newEventStatus=function(b){b.$valid?(a.statusError=!1,$("form[name='"+b.$name+"'] button[type='submit']").prop("disabled",!0)):a.statusError=!0},g.categories().success(function(b){a.event_categories=b}).error(function(){console.log("Error fetching event categories")}),a.close=function(){b.dismiss()},a.newMessageThread=function(c){if(c.$valid){var d=f.new_message(a.newMessage);d.then(function(a){a.status?b.close():console.error("Message Error")})}}}]);