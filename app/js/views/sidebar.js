
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



  });

  return SidebarView;

});
