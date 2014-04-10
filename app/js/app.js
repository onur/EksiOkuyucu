define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'views/sidebar',
  'bootstrap'
], function ($, _, Backbone, Router, SidebarView) {
  var initialize = function () {

    var sidebarView = new SidebarView  ();
    sidebarView.render ();

    Router.initialize ();
  }

  return {
    initialize: initialize
  };
});

