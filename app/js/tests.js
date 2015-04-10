require.config ({
  paths: {
    requireLib: 'libs/require',
    jquery: 'libs/jquery-1.11.0.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    text: 'libs/text',
    bootstrap: 'libs/bootstrap.min',
    templates: '../templates',
    jasmine: 'libs/jasmine-2.2.0/jasmine',
    'jasmine-html': 'libs/jasmine-2.2.0/jasmine-html',
    'jasmine-boot': 'libs/jasmine-2.2.0/boot',
    'jasmine-jquery': 'libs/jasmine-jquery'
  },

  shim: {
    'bootstrap': {
       deps: ["jquery"]
    },
    'jquery': {
       exports: '$'
    },
    'jasmine-html': {
       deps: ['jasmine'],
    },
    'jasmine-jquery': {
       deps: ['jquery', 'jasmine'],
    },
    'jasmine-boot': {
       deps: ['jasmine', 'jasmine-html'],
    }
  }
});


var specs = [
  'tests/sidebar',
  'tests/debe'
];


require([
  'app',
  'jasmine-boot'
], function (App) {

  App.initialize (true);

  // Load the specs
  require(specs, function () {

    // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
    window.onload();
  });

});
