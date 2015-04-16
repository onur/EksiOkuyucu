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

      this.sidebarView = new SidebarView  ();
      this.searchView = new SearchView();

      this.userView = new UserView ();

      if (!tests) {
        this.sidebarView.render ();
        Router.initialize ();
      }
    }

  }

});

