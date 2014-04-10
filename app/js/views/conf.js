
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/basic_nav.html',
  'text!templates/conf.html'
], function($, _, Backbone, BasicNavTemplate, ConfTemplate){


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

      $('#right-navbar').html (_.template (BasicNavTemplate,
                                           { title: 'Ayarlar' }));
      $(this.el).append (_.template (ConfTemplate));

    },


    events: {
      'click ul.theme a': 'changeTheme'
    },


    changeTheme: function (ev) {
      var theme = $(ev.currentTarget).attr ('href').replace (/^#/, '');
      $('body').attr ('class', 'theme-' + theme);
      return false;
    },

  });


  return ConfView;

});
