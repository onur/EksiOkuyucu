
define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
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

    setTitle: function (title, rightNavBar) {
      $('#select2-chosen-1').text (title);
      $('title').text (title);

      if (typeof (rightNavBar) != 'undefined')
        this.setRightNavbar (rightNavBar);
      else
        this.setRightNavbar ('');
    },

    setRightNavbar: function (content) {
      $('ul.navbar-right').html (content);
    },
  
  };
});
