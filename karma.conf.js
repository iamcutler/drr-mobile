// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/jquery-cookie/jquery.cookie.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'app/bower_components/ng-file-upload/angular-file-upload.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/moment/moment.js',
      'app/bower_components/angular-moment/angular-moment.min.js',
      'app/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'app/bower_components/sinonjs/sinon.js',
      'app/bower_components/jasmine-sinon/lib/jasmine-sinon.js',
      'app/bower_components/angular-easyfb/angular-easyfb.js',
      'app/scripts/*.js',
      'app/views/**/*.html',
      'app/scripts/**/*.js',
      //'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    /*preprocessors: {
      'app/views/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },*/

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
