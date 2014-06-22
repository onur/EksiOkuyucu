
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  return {

    // default options
    options: {

      theme: 'default',

      // use readability for external url
      readability: true,

      // show youtube videos in application
      youtube: true,

    },


    // cookie name
    name: 'eksi_okuyucu_options',
  

    loadConf: function () {
      $.cookie.json = true;

      var user_options = $.cookie (this.name);
      if (!user_options) return;

      if (typeof (user_options.theme) != 'undefined')
        this.options.theme = user_options.theme;
      if (typeof (user_options.readability) != 'undefined')
        this.options.readability = user_options.readability;
      if (typeof (user_options.youtube) != 'undefined')
        this.options.youtube = user_options.youtube;

      this.switchTheme ();

    },


    saveConf: function () {
      $.cookie (this.name, this.options, { expires: 3650 });
    },


    switchTheme: function () {
      $('body').attr ('class', 'theme-' + this.options.theme);
    },


    setOption: function (option, val) {

      var somethingChanged = false;

      if (option == 'readability' && this.options.readability != val) {
        this.options.readability = val;
        somethingChanged = true;
      } else if (option == 'youtube' && this.options.youtube != val) {
        this.options.youtube = val;
        somethingChanged = true;
      }

      if (somethingChanged)
        this.saveConf ();

    },

  };
  
});
