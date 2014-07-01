define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'helpers/conf',
  'views/sidebar',
  'views/search',
  'text!templates/body.html',
  'bootstrap',
  'jquery_cookie'
], function ($, _, Backbone, Router, ConfHelper,
             SidebarView, SearchView, BodyTemplate) {
  var initialize = function () {

    ConfHelper.loadConf ();

    $('body').html (_.template (BodyTemplate));

    var sidebarView = new SidebarView  ();
    sidebarView.render ();

    var searchView = new SearchView ();

    Router.initialize ();
  }

  return {
    initialize: initialize
  };
});

