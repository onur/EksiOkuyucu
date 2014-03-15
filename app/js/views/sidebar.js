
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/sidebar',
  'text!templates/sidebar.html',
  'text!templates/sidebar_nav.html'
], function ($, _, Backbone, SidebarCollection,
             SidebarTemplate, SidebarNavTemplate) {

  var SidebarView = Backbone.View.extend ({
    el: '#sidebar',

    initialize: function () {
      this.sidebarCollection = new SidebarCollection ();

      $("#left-navbar").html (_.template (SidebarNavTemplate));


      // register channels event
      var that = this;
      $("#channels a").click (function () { that.click (this); });
    },

    render: function () {

      var that = this;

      this.sidebarCollection.fetch ({

        success: function (entries) {

          $(that.el).append (_.template (SidebarTemplate,
                                         {entries: entries.toJSON ()}));

        }

      });
    },


    click: function (ev) {
      var channel = $(ev).attr ('href').match (/^#(hot)*(\/)*(.*?)$/, '')[3];

      if (channel == '')
        channel = 'gundem';

      this.sidebarCollection.channel = channel;
      this.sidebarCollection.reset ();
      $(this.el).html ('');
      this.render ();
    }

  });

  return SidebarView;

});
