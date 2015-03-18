
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/topic_right_nav.html',
], function ($, _, Backbone, TopicRightNavTemplate) {
  return {

    initialize: function (title) {
      // unbind previous events
      $('#main').off();
      // clear page content
      if (typeof (title) != undefined) {
        $('#main').html ('');
        this.setTitle (title);
      }
    },

    setTitle: function (title, rightNavOptions) {
      $('#select2-chosen-1').text (title);
      $('title').text (title);

      this.setRightNavbar (
        _.template (TopicRightNavTemplate, rightNavOptions));
    },

    setRightNavbar: function (content) {
      $('ul.navbar-right').html (content);
    },

    bindRefresh: function (view) {
      $('#refresh-topic').click (function () {
        view.refresh ();
        return false;
      });
    }
  
  };
});
