
require.config ({

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
    'jquery_cookie': {
       deps: ["jquery"]
    },
    'select2': {
       deps: ["jquery"]
    },
    'jasmine-html': {
       deps: ['jasmine'],
    },
    'jasmine-jquery': {
       deps: ['jquery', 'jasmine-boot', 'jasmine'],
    },
    'jasmine-boot': {
       deps: ['jasmine', 'jasmine-html'],
    }
  }
});
