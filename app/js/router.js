define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar',
  'views/topic',
  'views/topiclist',
  'views/hot',
  'views/sukela',
  'views/conf'
], function ($, _, Backbone, SidebarView, TopicView,
             TopicListView, HotView, SukelaView, ConfView) {
  var AppRouter = Backbone.Router.extend ({
    routes: {
      '': 'defaultAction',
      't/:order/:topic': 'topic',
      'hot/:channel': 'hotchannel',
      'hot': 'hot',
      'sukela': 'sukela',
      'conf': 'conf'
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
    // FIXME: need to use all route definitions in AppRouter
    router.route (/^tl\/(.*?)$/, "topiclist");
    router.on ('route:topiclist', function (external_url) {
      var topicListView = new TopicListView ();
      topicListView.render (external_url);
    });
    router.on ('route:hot', function () {
      var hotView = new HotView ();
      hotView.render ();
    });
    router.on ('route:hotchannel', function (channel) {
      var hotView = new HotView ();
      hotView.render (channel);
    });
    router.on ('route:sukela', function () {
      var sukelaView = new SukelaView ();
      sukelaView.render ();
    });
    router.on ('route:conf', function () {
      var confView = new ConfView ();
      confView.render ();
    });
    Backbone.history.start ();
  };

  return {
    initialize: initialize
  };
});
