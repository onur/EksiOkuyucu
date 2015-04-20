define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar',
  'views/topic',
  'views/topiclist',
  'views/hot',
  'views/sukela',
  'views/debe',
  'views/conf',
  'helpers/conf',
  'helpers/app'
], function ($, _, Backbone, SidebarView, TopicView,
             TopicListView, HotView, SukelaView, DebeView, ConfView,
             ConfHelper, AppHelper) {
  var AppRouter = Backbone.Router.extend ({
    routes: {
      '': 'defaultAction',
      't/:order/:topic': 'topic',
      'hot/:channel': 'hotchannel',
      'hot': 'hot',
      'sukela': 'sukela',
      'debe': 'debe',
      'conf': 'conf'
    },
  });

  var indexPage = function () {
    var index = ConfHelper.options.index;

    if (index == 'Gündem') {
      var hotView = new HotView ();
      hotView.render ();
    } else if (index == 'Bugün') {
      var hotView = new HotView ();
      hotView.render ('bugun');
    } else if (index == 'Debe') {
      var debeView = new DebeView ();
      debeView.render ();
    } else if (index == '$ükela') {
      var sukelaView = new SukelaView ();
      sukelaView.render ();
    } else if (index.charAt(0) == '#') {
      var hotView = new HotView ();
      hotView.render (index.substr(1));
    }

    AppHelper.welcome();
  };

  var initialize = function () {
    var router = new AppRouter;
    router.on ('route:defaultAction', function () {
      indexPage();
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
    router.on ('route:debe', function () {
      var debeView = new DebeView ();
      debeView.render ();
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
