


require.config ({
  paths: {
    jquery: 'libs/jquery-1.11.0.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    text: 'libs/text',
    bootstrap: 'libs/bootstrap.min'
  },

  shim: {
    'bootstrap': {
       deps: ["jquery"]
    }
  }
});

require([
  'app',
], function (App) {
  App.initialize ();
});
