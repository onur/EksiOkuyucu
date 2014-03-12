define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar',
  'views/topic',
  'views/hot'
], function ($, _, Backbone, SidebarView, TopicView, HotView) {
  var AppRouter = Backbone.Router.extend ({
    routes: {
      '': 'defaultAction',
      't/:order/:topic': 'topic',
      'hot': 'hot',
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
    router.on ('route:hot', function () {
      var hotView = new HotView ();
      hotView.render ();
    });
    Backbone.history.start ();
  };

  return {
    initialize: initialize
  };
});
