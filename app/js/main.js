/*
 * EksiOkuyucu - eksisozluk reader
 * https://github.com/onuraslan/EksiOkuyucu
 *
 * Copyright (C) 2015  Onur Aslan  <onur@onur.im>
 * Licensed under MIT
 */

require.config ({
  paths: {
    requireLib: 'libs/require',
    jquery: 'libs/jquery-1.11.0.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    text: 'libs/text',
    bootstrap: 'libs/bootstrap.min',
    templates: '../templates'
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
