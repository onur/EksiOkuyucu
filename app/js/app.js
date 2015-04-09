define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'helpers/conf',
  'helpers/usertag',
  'views/sidebar',
  'views/user',
  'text!templates/body.html',
  'bootstrap'
], function ($, _, Backbone, Router, ConfHelper, UserTagHelper,
             SidebarView, UserView, BodyTemplate) {
  var initialize = function (tests) {

    ConfHelper.loadConf ();
    ConfHelper.switchTheme ();
    ConfHelper.switchFont ();

    UserTagHelper.loadUserTags();

    $('body').html (_.template (BodyTemplate));

    var sidebarView = new SidebarView  ();

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

