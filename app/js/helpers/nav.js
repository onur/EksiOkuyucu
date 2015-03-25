
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

      // remove binding of refresh button and hide by default
      $('#refresh-topic-container').off();

      // clear page content
      if (typeof (title) != undefined) {
        $('#main').html ('');
        this.setTitle (title);
      }

      this.loader(false);
    },

    setTitle: function (title, rightNavOptions) {
      $('#select2-chosen-1').text (title);
      $('title').text (title);

      this.setRightNavbar (
        _.template (TopicRightNavTemplate, rightNavOptions));

      $('#refresh-topic').hide();
    },

    setRightNavbar: function (content) {
      $('ul.navbar-right').html (content);
    },

    bindRefresh: function (view) {
      $('#refresh-topic').show();
      $('#refresh-topic').click (function () {
        view.refresh ();
        return false;
      });
    },

    loader: function (state) {
      if (state == true) {
        $('#loader').show();
      } else {
        $('#loader').hide();
      }
    }
  
  };
});
