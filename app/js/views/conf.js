
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
      'change input': 'changeOption'
    },


    changeTheme: function (ev) {
      var theme = $(ev.currentTarget).attr ('href').replace (/^#/, '');

      ConfHelper.options.theme = theme;
      ConfHelper.switchTheme ();
      ConfHelper.saveConf ();

      return false;
    },


    changeOption: function (ev) {
      var option = $(ev.currentTarget).attr ('value');
      var val = $(ev.currentTarget).is (':checked');

      ConfHelper.setOption (option, val);
    }

  });


  return ConfView;

});
