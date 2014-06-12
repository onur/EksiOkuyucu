
define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  return {

    setTitle: function (title, rightNavBar) {
      $('#title').text (title);
      $('title').text (title);

      if (typeof (rightNavBar) != 'undefined')
        this.setRightNavbar (rightNavBar);
    },

    setRightNavbar: function (content) {
      $('ul.navbar-right').html (content);
    },
  
  };
});
