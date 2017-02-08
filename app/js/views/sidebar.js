
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/sidebar',
  'helpers/conf',
  'text!templates/sidebar.html'
], function ($, _, Backbone, SidebarCollection,
             ConfHelper, SidebarTemplate) {

  var SidebarView = Backbone.View.extend ({
    el: '#sidebar',
    leftFrameVisible: false,

    initialize: function () {
      this.sidebarCollection = new SidebarCollection ();

      // register channels event
      var that = this;

      $("#sidebar-wrapper").on ('scroll', function () {
        that.checkScroll (this);
      });

      // bind show left frame button for mobile layout
      $('#left-frame-toggle').click (function () { that.toggleLeftFrame (); });

      $(window).on ('resize', function () {
        that.hideLeftFrame ();
      });

      this.fillChannelsMenu();

      // TODO: add swipe events for sidebar
      // http://www.netcu.de/jquery-touchwipe-iphone-ipad-library
    },

    render: function () {

      var that = this;

      this.isLoading = true;

      this.sidebarCollection.fetch ({

        success: function (entries) {

          $(that.el).append (_.template (SidebarTemplate,
                                         {entries: entries.toJSON ()}));

          that.isLoading = false;

          // hide left frame when user clicks a item
          $('#sidebar a').click (function () {
            that.hideLeftFrame ();
          });

        }

      });
    },


    click: function (ev) {
      var channel = $(ev).attr ('href').match (/^#(hot)*(\/)*(.*?)$/, '')[3];

      if (channel == '')
        channel = 'basliklar/gundem';
      else if (channel == 'bugun')
        channel = 'basliklar/bugun';
      else
        channel = 'basliklar/kanal/' + channel;

      this.sidebarCollection.channel = channel;
      this.sidebarCollection.page = 1;
      this.sidebarCollection.reset ();
      $(this.el).html ('');
      this.render ();

      this.showLeftFrame ();

      this.hideMenu(ev);
    },

    checkScroll: function () {
      if (!this.isLoading &&
          !this.sidebarCollection.lastPage () &&
          $('#sidebar-wrapper').scrollTop () +
              $('#sidebar-wrapper').height () + 200 >
              this.el.scrollHeight) {
        this.sidebarCollection.page++;
        this.render ();
      }

    },


    showLeftFrame: function () {
      if ($(window).width () > 767)
        return;
      $('#sidebar-wrapper').css ('margin-left', '0');
      this.leftFrameVisible = true;
    },
     
    hideLeftFrame: function () {
      $('#sidebar-wrapper').css ('margin-left', '-250px');
      this.leftFrameVisible = false;
    },

    toggleLeftFrame: function () {
      if (!this.leftFrameVisible)
        this.showLeftFrame ();
      else
        this.hideLeftFrame ();
    },


    fillChannelsMenu: function () {
      var that = this;

      $("#channels a").off();
      $('#channels li.divider').nextAll().remove();

      _.map(ConfHelper.options.channels, function(channel) {
        $('#channels').append(
            _.template('<li><a href="#hot/<%= channel.substr(1, channel.length) %>"><%= channel %></a></li>',
                       { channel: channel }))
      });

      $("#channels a").click (function () { that.click (this); });
    },


    // Hide menu for narrow screens
    hideMenu: function (currentTarget) {

      if ($(window).width () < 767 && $(currentTarget).attr ('href') != '#')
        $('div.navbar-eksi-okuyucu').removeClass('in');

    },

    bindHideMenu: function () {
      var that = this;

      $('div.navbar-eksi-okuyucu a').click (function () {
        that.hideMenu(this);
      });
    }

  });

  return SidebarView;

});
