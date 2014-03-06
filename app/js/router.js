define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar',
  'views/topic'
], function ($, _, Backbone, SidebarView, TopicView) {
  var AppRouter = Backbone.Router.extend ({
    routes: {
      '': 'defaultAction',
      't/:order/:topic': 'topic'
    },
  });

  var initialize = function () {
    var router = new AppRouter;
    router.on ('route:defaultAction', function () {
    });
    router.on ('route:topic', function (order, topic) {
      var topicView = new TopicView ();
      topicView.render (order, topic);
    });
    Backbone.history.start ();
  };

  return {
    initialize: initialize
  };
});
