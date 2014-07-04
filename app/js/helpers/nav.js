
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/topic_right_nav.html',
], function ($, _, Backbone, TopicRightNavTemplate) {
  return {

    initialize: function (title) {
      // unbind previous events
      // FIXME: this is not right place for this
      //        it's just a temporary workaround
      $('#main').unbind ('scroll');
      $('#main').unbind ('click');
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
  
  };
});
