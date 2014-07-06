
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/conf',
  'collections/olay',
  'text!templates/login_modal.html',
], function($, _, Backbone, ConfHelper, OlayCollection, LoginModalTemplate) {

  var UserView = Backbone.View.extend ({

    // :(
    el: 'body',
    token: '',
    loggedIn: false,
    unreadCount: 0,

    initialize: function () {
      this.olayCollection = new OlayCollection ();
      this.checkLoggedIn ();
    },


    events: {
      'click #ben-login': 'loginForm',
      'click #login-button': 'login'
    },


    getSubscribtions: function () {
      if (!this.loggedIn)
        return;

      var that = this;

      // USER IS LOGGED IN I AM GETTING SUBS
      this.olayCollection.fetch ({
        success: function (entries) {
          that.unreadCount = 0;
          $('#ben-items').html ('');
          _.each (entries.toJSON (), function (entry) {
            // good old times
            $('#ben-items').append (
              $('<li>').html (
                $('<a>').attr ('href', '#/t/' + entry.snapshot + '' + entry.url)
                        .text (entry.title)
              )
            );
            that.unreadCount += entry.count;
          });

          // show unread count
          if (that.unreadCount) {
            $('#user-drop span.unread-count').text (that.unreadCount);
            $('#user-drop span.unread-count').show ();
          } else {
            $('#user-drop span.unread-count').hide ();
          }
        }
      });
    },

    checkLoggedIn: function () {

      var that = this;

      $.ajax ({
        type: 'GET',
        url: 'https://eksisozluk.com/',
        async: true,
        dataType: 'html',
        headers: {
          'X-Requested-With': ''
        },
        success: function (data) {
          that.loggedIn = $($.parseHTML (data)).
                  find ('nav[class="loggedin"]').length > 0;
          that.getSubscribtions ();
        }
      });

    },


    getToken: function () {
      var that = this;
      $.ajax ({
        type: 'GET',
        url: 'https://eksisozluk.com/giris',
        async: true,
        dataType: 'html',
        headers: {
          'X-Requested-With': ''
        },
        success: function (data) {
          that.token = $($.parseHTML (data)).
              find ('input[name="__RequestVerificationToken"]').val ();
        }
      });
    },

    loginForm: function () {

      if (!$('#login-modal').length) {
        $('body').append (_.template (LoginModalTemplate));
      }

      this.getToken ();
      $('#login-modal').modal ('show');
    },

    login: function () {

      var that = this;

      var email    = $('#login-email').val ();
      var password = $('#login-password').val ();
      var remember_me = $('#login-remember-me').is (':checked');

      $.ajax ({
        type: 'POST',
        url: 'https://eksisozluk.com/giris',
        dataType: 'html',
        data: {
          UserName: email,
          Password: password,
          RememberMe: remember_me,
          __RequestVerificationToken: that.token
        },
        success: function (data, textStatus, request) {
          that.loggedIn = $($.parseHTML (data)).
                  find ('nav[class="loggedin"]').length > 0;
          if (that.loggedIn) {
            $('#login-modal').modal ('hide');
            that.getSubscribtions ();
          }
        },
      });

    }

  });

  return UserView;

});
