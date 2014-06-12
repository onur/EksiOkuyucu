
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/conf',
  'text!templates/basic_nav.html',
  'text!templates/conf.html'
], function($, _, Backbone, ConfHelper, BasicNavTemplate, ConfTemplate){


  var ConfView = Backbone.View.extend ({
    el: '#main',

    initialize: function () {

      // unbind previous events
      // FIXME: need better solution for this
      $(this.el).unbind ('scroll');
      $(this.el).unbind ('click');

      // clear page content
      $(this.el).html ('');

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
