require.config ({
  baseUrl: '../app/js',
  paths: {
    requireLib: 'libs/require',
    jquery: 'libs/jquery-1.11.0.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    text: 'libs/text',
    bootstrap: 'libs/bootstrap.min',
    jquery_cookie: 'libs/jquery.cookie',
    select2: 'libs/select2.min',
    templates: '../templates',
    jasmine: '../../tests/lib/jasmine-2.2.0/jasmine',
    'jasmine-html': '../../tests/lib/jasmine-2.2.0/jasmine-html',
    'jasmine-boot': '../../tests/lib/jasmine-2.2.0/boot'
  },

  shim: {
    'bootstrap': {
       deps: ["jquery"]
    },
    'jquery_cookie': {
       deps: ["jquery"]
    },
    'select2': {
       deps: ["jquery"]
    },
    jasmine: {
    },
    'jasmine-html': {
       deps: ['jasmine'],
    },
    'jasmine-boot': {
       deps: ['jasmine', 'jasmine-html'],
    }
  }
});


var specs = [
  '../../tests/spec/sidebar'
];


require([
  'jasmine-boot'
], function () {

  // Load the specs
  require(specs, function () {

    // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
    window.onload();
  });

});
