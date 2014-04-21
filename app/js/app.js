define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'helpers/conf',
  'views/sidebar',
  'bootstrap',
  'jquery_cookie'
], function ($, _, Backbone, Router, ConfHelper, SidebarView) {
  var initialize = function () {

    ConfHelper.loadConf ();

    var sidebarView = new SidebarView  ();
    sidebarView.render ();

    Router.initialize ();
  }

  return {
    initialize: initialize
  };
});

