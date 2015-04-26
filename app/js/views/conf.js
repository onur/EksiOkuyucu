
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/app',
  'helpers/conf',
  'text!templates/conf.html',
  'text!templates/add_usertag_modal.html',
  'helpers/nav',
  'helpers/usertag',
], function($, _, Backbone, AppHelper, ConfHelper, ConfTemplate,
            AddUsertagModalTemplate, NavHelper, UserTagHelper){


  var ConfView = Backbone.View.extend ({
    el: '#main',

    initialize: function () {
      NavHelper.initialize ('Ayarlar');

      // FIXME: Navhelper stucking for some reason
      NavHelper.loader(false);
    },

    render: function () {

      $(this.el).append (_.template (ConfTemplate,
                                     { options: ConfHelper.options }));

      // usertag form modal
      // this is a bit messy but modal must be placed in body
      if (!$('#add-usertag-modal').length) {
        var that = this;
        $('body').append (_.template (AddUsertagModalTemplate));
        $('#add-usertag-button').click(function () {
          that.addUserTag();
          return false;
        });
        $('#add-usertag-modal').on('shown.bs.modal', function () {
          $('#add-usertag-username').focus()
        });
      }

      this.loadUserTags();

    },


    events: {
      'click ul.theme a': 'changeTheme',
      'click div.font a': 'changeFont',
      'change input': 'changeOption',
      'change #index-page': 'changeIndex',
      'click #remove-usertag-button': 'removeUserTag',
      'click a[href="#about"]': 'about'
    },


    changeTheme: function (ev) {
      var theme = $(ev.currentTarget).attr ('href').replace (/^#/, '');

      ConfHelper.options.theme = theme;
      ConfHelper.switchTheme ();
      ConfHelper.saveConf ();

      return false;
    },


    changeFont: function (ev) {
      var font = $(ev.currentTarget).attr ('href').replace (/^#/, '');

      ConfHelper.options.font = font;
      ConfHelper.switchFont ();
      ConfHelper.saveConf ();

      $(this.el).find('div.font a').each(function() {
        $(this).removeClass('active');
      });
      $(ev.currentTarget).addClass('active');

      return false;
    },


    changeOption: function (ev) {
      var option = $(ev.currentTarget).attr ('value');
      var val = $(ev.currentTarget).is (':checked');

      // FIXME: poor design. Listening change input is causing this
      if (option == 'channel') {
        var channel = $(ev.currentTarget).attr('data-channel');
        ConfHelper.setChannel(channel, val);
        AppHelper.sidebarView.fillChannelsMenu();
      } else {
        ConfHelper.setOption (option, val);
      }

    },

    changeIndex: function (ev) {

      var newIndex = $(ev.currentTarget).find('option:selected').text();

      if (ConfHelper.options.index != newIndex) {
        ConfHelper.options.index = newIndex;
        ConfHelper.saveConf();
      }
    },



    loadUserTags: function () {
      $('#usertag-list').html('');
      _.map(UserTagHelper.userTags, function(tags, user) {
        var tags_s = '';
        _.each(tags, function(tag) {
          $('#usertag-list').append($('<option>').text(user + ': ' + tag));
        });
      });
    },


    addUserTag: function () {

      var username = $('#add-usertag-username').val();
      var usertag = $('#add-usertag-tag').val();
      if (!username || !usertag) {
        return;
      }

      UserTagHelper.addUserTag(username, usertag);
      this.loadUserTags();

      $('#add-usertag-modal').modal('hide');

    },

    removeUserTag: function (ev) {
      $('#usertag-list').find('option:selected').each(function() {
        var tag = $(this).text().split(': ');
        UserTagHelper.removeUserTag(tag[0], tag[1]);
        $(this).remove();
      });
      return false;
    },

    about: function () {
      AppHelper.welcome(true);
      return false;
    }

  });


  return ConfView;

});
