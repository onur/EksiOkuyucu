
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/conf',
  'collections/olay',
  'text!templates/login_modal.html',
  'text!templates/user_items.html'
], function($, _, Backbone, ConfHelper, OlayCollection, LoginModalTemplate,
            UserItemsTemplate) {

  var UserView = Backbone.View.extend ({

    // :(
    el: 'body',
    token: '',
    loggedIn: false,
    unreadCount: 0,
    userName: '',

    initialize: function () {
      this.olayCollection = new OlayCollection ();
      this.checkLoggedIn ();
    },


    events: {
      'click #ben-login': 'loginForm',
      'click #login-button': 'login',
      'click #logout-button': 'logout'
    },


    getSubscriptions: function () {
      if (!this.loggedIn)
        return;

      var that = this;

      // USER IS LOGGED IN I AM GETTING SUBS
      this.olayCollection.fetch ({
        success: function (entries) {
          that.unreadCount = 0;
          $('#ben-items').html (_.template (UserItemsTemplate, {
            user: that.userName,
            entries: entries.toJSON ()
          }));

          entries.each (function (entry) {
            that.unreadCount += parseInt (entry.get ('count'));
          });

          // show unread count
          if (that.unreadCount) {
            $('#user-drop span.unread-count').text (that.unreadCount);
            $('#user-drop span.unread-count').show ();
          } else {
            $('#user-drop span.unread-count').hide ();
          }

          // check subscriptions every min
          setTimeout (function () { that.getSubscriptions (); }, 60000);
        }
      });
    },


    findUserName: function (htmlDoc) {

      var username;
      var c = 0;

      $(htmlDoc).find ('#top-navigation ul li a').each (function () {
        if (++c != 3)
          return;
        username = $(this).attr ('title');
      });

      return username;
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
          var htmlDoc = $.parseHTML (data);
          that.loggedIn = $(htmlDoc).find ('nav[class="loggedin"]').length > 0;
          if (that.loggedIn) {
            that.userName = that.findUserName (htmlDoc);
            that.getSubscriptions ();
          }
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

      return false;
    },

    login: function () {

      var that = this;

      var email    = $('#login-email').val ();
      var password = $('#login-password').val ();
      var remember_me = $('#login-remember-me').is (':checked');

      $('#login-modal div.alert').addClass('hidden');

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
          var htmlDoc = $.parseHTML (data);
          that.loggedIn = $(htmlDoc).find ('nav[class="loggedin"]').length > 0;
          if (that.loggedIn) {
            that.userName = that.findUserName (htmlDoc);

            $('#login-modal').modal ('hide');
            that.getSubscriptions ();
          } else {
            $('#login-modal div.alert').removeClass('hidden');
          }
        },
      });

    },


    logout: function () {
      $.get ('https://eksisozluk.com/terk');
      this.loggedIn = false;
      this.userName = '';
      $('#user-drop span.unread-count').hide ();
      $('#ben-items').html (
        $('<li>').html (
          $('<a>').attr ('id', 'ben-login')
                  .attr ('href', '#')
                  .html (
                    $('<span>').attr ('class', 'glyphicon glyphicon-log-in')
                  )
                  .append (' Giriş')
        )
      );
    }

  });

  return UserView;

});
