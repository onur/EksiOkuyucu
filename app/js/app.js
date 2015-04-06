define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'helpers/conf',
  'helpers/usertag',
  'views/sidebar',
  'views/search',
  'views/user',
  'text!templates/body.html',
  'bootstrap',
  'jquery_cookie'
], function ($, _, Backbone, Router, ConfHelper, UserTagHelper,
             SidebarView, SearchView, UserView, BodyTemplate) {
  var initialize = function (tests) {

    ConfHelper.loadConf ();
    ConfHelper.switchTheme ();
    ConfHelper.switchFont ();

    UserTagHelper.loadUserTags();

    $('body').html (_.template (BodyTemplate));

    var sidebarView = new SidebarView  ();

    var searchView = new SearchView ();
    var userView = new UserView ();

    if (!tests) {
      sidebarView.render ();
      Router.initialize ();
    }
  }

  return {
    initialize: initialize
  };
});

