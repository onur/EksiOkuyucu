
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

      // unbind previous scroll event
      $(window).off('scroll');

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
      $('#navbar-title').text (title);
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


    bindScroll: function(view) {
      $(window).scroll(function(ev) {
        view.checkScroll();
      });
    },


    checkScroll: function(view) {
      return $(window).scrollTop () + $(window).height () >
                 $("#main").height () - 200;
    },


    // loading animation
    // state is true if its loading, false if its not
    // need to wait before hiding animation
    loader_current_state: false,
    loader_current_timeout: -1,
    loader_show: function () {
      $('#loader').show();
    },
    loader_hide: function () {
      $('#loader').hide();
    },
    loader: function (state) {
      if (state == true && this.loader_current_state == false) {
        this.loader_show();
        this.loader_current_state = true;
      } else if (this.loader_current_state == true) {
        var that = this;
        if (this.loader_current_timeout != -1) {
          clearTimeout(this.loader_current_timeout);
        }

        this.loader_current_timeout = setTimeout(function () {
          that.loader_hide();
          that.loader_current_state = false;
          that.loader_current_timeout = -1;
        }, 1000);
      }
    }
  
  };
});
