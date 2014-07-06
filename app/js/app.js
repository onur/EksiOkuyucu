define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'helpers/conf',
  'views/sidebar',
  'views/search',
  'views/user',
  'text!templates/body.html',
  'bootstrap',
  'jquery_cookie'
], function ($, _, Backbone, Router, ConfHelper,
             SidebarView, SearchView, UserView, BodyTemplate) {
  var initialize = function () {

    ConfHelper.loadConf ();

    $('body').html (_.template (BodyTemplate));

    var sidebarView = new SidebarView  ();
    sidebarView.render ();

    var searchView = new SearchView ();
    var userView = new UserView ();

    Router.initialize ();
  }

  return {
    initialize: initialize
  };
});

