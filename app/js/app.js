define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'helpers/app',
  'helpers/conf',
  'helpers/usertag',
  'views/sidebar',
  'views/user',
  'views/search',
  'text!templates/body.html',
  'bootstrap'
], function ($, _, Backbone, Router, AppHelper, ConfHelper, UserTagHelper,
             SidebarView, UserView, SearchView, BodyTemplate) {
  return {
    version: '0.1.2',
    initialize: function (tests) {

      ConfHelper.loadConf ();
      ConfHelper.switchTheme ();
      ConfHelper.switchFont ();

      AppHelper.initialize (this.version);

      UserTagHelper.loadUserTags();

      $('body').html (_.template (BodyTemplate));

      AppHelper.sidebarView = new SidebarView  ();
      AppHelper.searchView = new SearchView();

      AppHelper.userView = new UserView ();

      if (!tests) {
        AppHelper.sidebarView.render ();
        Router.initialize ();
      }
    }

  }

});

