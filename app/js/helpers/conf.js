
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


    // cokie name
    name: 'eksi_okuyucu_options',
  

    loadConf: function () {
      $.cookie.json = true;

      var user_options = $.cookie (this.name);
      if (!user_options) return;

      if (user_options.theme)
        this.options.theme = user_options.theme;
      if (user_options.readability)
        this.options.readability = user_options.readability;
      if (user_options.youtube)
        this.options.youtube = user_options.youtube;

      if (this.options.theme != 'default')
        this.switchTheme ();

    },


    saveConf: function () {
      $.cookie (this.name, this.options, { expires: 3650 });
    },


    switchTheme: function () {
      $('body').attr ('class', 'theme-' + this.options.theme);
    }

  };
  
});
