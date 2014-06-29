


require.config ({
  paths: {
    jquery: 'libs/jquery-1.11.0.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    text: 'libs/text',
    bootstrap: 'libs/bootstrap.min',
    jquery_cookie: 'libs/jquery.cookie',
    select2: 'libs/select2.min'
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
    }
  }
});

require([
  'app',
], function (App) {
  App.initialize ();
});
