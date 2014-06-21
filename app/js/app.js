define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'helpers/conf',
  'views/sidebar',
  'text!templates/body.html',
  'bootstrap',
  'jquery_cookie'
], function ($, _, Backbone, Router, ConfHelper, SidebarView, BodyTemplate) {
  var initialize = function () {

    ConfHelper.loadConf ();

    $('body').html (_.template (BodyTemplate));

    var sidebarView = new SidebarView  ();
    sidebarView.render ();

    Router.initialize ();
  }

  return {
    initialize: initialize
  };
});

