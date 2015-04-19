
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  return {

    // default options
    options: {

      theme: 'yeti',

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
      tag_ak_trolls: true,

      // default active channels
      channels: [
        '#anket',
        '#bilim',
        '#edebiyat',
        '#ekşi-sözlük',
        '#ilişkiler',
        '#müzik',
        '#oyun',
        '#programlama',
        '#sanat',
        '#sinema',
        '#siyaset',
        '#spor',
        '#tarih',
        '#teknoloji',
        '#tv'
      ],


      welcome_page: false

    },


    // cookie name
    name: 'eksi_okuyucu_options',
  

    loadConf: function () {
      var user_options = JSON.parse(localStorage.getItem(this.name)) || {};

      var that = this;
      _.map(this.options, function(val, key) {
        if (typeof(user_options[key]) != 'undefined')
          that.options[key] = user_options[key];
      });

    },


    saveConf: function () {
      localStorage.setItem(this.name, JSON.stringify(this.options));
    },


    switchTheme: function () {

      var themes = ['cyborg', 'darkly', 'flatly', 'lumen', 'spacelab', 'yeti'];
      if (themes.indexOf(this.options.theme) < 0)
        this.options.theme = 'spacelab';


      var theme_css = $('<link>').attr('href',
          'css/bootstrap-' + this.options.theme + '.min.css')
        .attr('type', 'text/css').attr('id', 'theme-css-file')
        .attr('rel', 'stylesheet');

      $('#theme-css-file').remove();
      $('head').prepend(theme_css);
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
    },


    setChannel: function (channel, val) {
      var somethingChanged = false;
      var index;

      if (val == true && this.options.channels.indexOf(channel) < 0) {
        this.options.channels.push(channel);
        this.options.channels.sort();
        somethingChanged = true;
      } else if (val == false &&
                 (index = this.options.channels.indexOf(channel)) >= 0) {
        this.options.channels.splice(index, 1);
        somethingChanged = true;
      }

      if (somethingChanged)
        this.saveConf ();
    }

  };
  
});
