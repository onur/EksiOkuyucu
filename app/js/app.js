define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'helpers/conf',
  'helpers/usertag',
  'views/sidebar',
  'views/user',
  'views/search',
  'text!templates/body.html',
  'bootstrap'
], function ($, _, Backbone, Router, ConfHelper, UserTagHelper,
             SidebarView, UserView, SearchView, BodyTemplate) {
  return {
    initialize: function (tests) {

      ConfHelper.loadConf ();
      ConfHelper.switchTheme ();
      ConfHelper.switchFont ();

      UserTagHelper.loadUserTags();

      $('body').html (_.template (BodyTemplate));

      var sidebarView = new SidebarView  ();
      var searchView = new SearchView();

      var userView = new UserView ();

      if (!tests) {
        sidebarView.render ();
        Router.initialize ();
      }
    }

  }

});

