/*
 * EksiOkuyucu - unofficial eksisozluk client
 * http://eksiokuyucu.com/
 *
 * Copyright (C) 2014  Onur Aslan  <onuraslan@gmail.com>
 * Licensed under MIT
 * https://github.com/onuraslan/EksiOkuyucu/blob/master/COPYING
 */

require.config ({
  paths: {
    requireLib: 'libs/require',
    jquery: 'libs/jquery-1.11.0.min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    text: 'libs/text',
    bootstrap: 'libs/bootstrap.min',
    select2: 'libs/select2.min',
    templates: '../templates'
  },

  shim: {
    'bootstrap': {
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
