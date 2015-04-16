
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  return {

    // default options
    options: {

      theme: 'spacelab',

      // popovers for internal links
      popover: true,

      // use readability for external url
      readability: false,

      // show youtube videos in application
      youtube: true,

      // show images in application
      images: true,

      // index page
      index: 'Gündem',

      // font
      font: 'default',

      // tag_ak_trolls
      tag_ak_trolls: true

    },


    // cookie name
    name: 'eksi_okuyucu_options',
  

    loadConf: function () {
      var user_options = JSON.parse(localStorage.getItem(this.name)) || {};

      if (typeof (user_options.popover) != 'undefined')
        this.options.popover = user_options.popover;
      if (typeof (user_options.theme) != 'undefined')
        this.options.theme = user_options.theme;
      if (typeof (user_options.readability) != 'undefined')
        this.options.readability = user_options.readability;
      if (typeof (user_options.youtube) != 'undefined')
        this.options.youtube = user_options.youtube;
      if (typeof (user_options.images) != 'undefined')
        this.options.images = user_options.images;
      if (typeof (user_options.index) != 'undefined')
        this.options.index = user_options.index;
      if (typeof (user_options.font) != 'undefined')
        this.options.font = user_options.font;
      if (typeof (user_options.tag_ak_trolls) != 'undefined')
        this.options.tag_ak_trolls = user_options.tag_ak_trolls;

    },


    saveConf: function () {
      localStorage.setItem(this.name, JSON.stringify(this.options));
    },


    switchTheme: function () {

      var themes = ['cyborg', 'darkly', 'flatly', 'lumen', 'spacelab', 'yeti'];
      if (themes.indexOf(this.options.theme) < 0)
        this.options.theme = 'spacelab';

      $('#theme-css-file').attr('href',
          'css/bootstrap-' + this.options.theme + '.min.css');
      $('body').attr ('class', 'theme-' + this.options.theme);
    },


    switchFont: function () {

      var font_family;

      $('body').css('font-family', '');

      if (this.options.font == 'default') {
        return;
      }

      else if (this.options.font == 'source_sans_pro') {
        font_name = "'Source Sans Pro', sans-serif";
      }

      else if (this.options.font == 'fira_sans') {
        font_name = "'Fira Sans', sans-serif";
      }

      else if (this.options.font == 'libre_baskerville') {
        font_name = "'Libre Baskerville', serif";
      }

      $('body').css('font-family', font_name);

    },


    setOption: function (option, val) {

      var that = this;
      _.map(this.options, function(op_val, op) {
        if (option != op || op_val == val)
          return;
        that.options[op] = val;
        somethingChanged = true;
      });

      if (somethingChanged)
        this.saveConf ();

    },

    getOption: function (option) {
      if (option == 'popover')
        return this.options.popover;
      else if (option == 'readability')
        return this.options.readability;
      else if (option == 'youtube')
        return this.options.youtube;
      else if (option == 'images')
        return this.options.images;
      else
        return false;
    }

  };
  
});
