
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/sidebar',
  'text!templates/sidebar.html'
], function ($, _, Backbone, SidebarCollection, SidebarTemplate) {

  var SidebarView = Backbone.View.extend ({
    el: '#sidebar',

    initialize: function () {
      this.sidebarCollection = new SidebarCollection ();
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
