
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/conf',
  'text!templates/conf.html',
  'helpers/nav'
], function($, _, Backbone, ConfHelper, ConfTemplate, NavHelper){


  var ConfView = Backbone.View.extend ({
    el: '#main',

    initialize: function () {
      NavHelper.initialize ('Ayarlar');
    },

    render: function () {

      $(this.el).append (_.template (ConfTemplate,
                                     { options: ConfHelper.options }));

    },


    events: {
      'click ul.theme a': 'changeTheme',
      'click ul.font a': 'changeFont',
      'change input': 'changeOption',
      'change #index-page': 'changeIndex'
    },


    changeTheme: function (ev) {
      var theme = $(ev.currentTarget).attr ('href').replace (/^#/, '');

      ConfHelper.options.theme = theme;
      ConfHelper.switchTheme ();
      ConfHelper.saveConf ();

      return false;
    },


    changeFont: function (ev) {
      var font = $(ev.currentTarget).attr ('href').replace (/^#/, '');

      ConfHelper.options.font = font;
      ConfHelper.switchFont ();
      ConfHelper.saveConf ();

      $(this.el).find('ul.font a').each(function() {
        $(this).removeClass('active');
      });
      $(ev.currentTarget).addClass('active');

      return false;
    },


    changeOption: function (ev) {
      var option = $(ev.currentTarget).attr ('value');
      var val = $(ev.currentTarget).is (':checked');

      ConfHelper.setOption (option, val);
    },

    changeIndex: function (ev) {

      var newIndex = $(ev.currentTarget).find('option:selected').text();

      if (ConfHelper.options.index != newIndex) {
        ConfHelper.options.index = newIndex;
        ConfHelper.saveConf();
      }
    }

  });


  return ConfView;

});
