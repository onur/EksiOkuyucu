
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/sidebar',
  'text!templates/sidebar.html',
  'text!templates/sidebar_nav.html'
], function ($, _, Backbone, SidebarCollection,
             SidebarTemplate, SidebarNavTemplate) {

  var SidebarView = Backbone.View.extend ({
    el: '#sidebar',
    leftFrameVisible: false,

    initialize: function () {
      this.sidebarCollection = new SidebarCollection ();

      $("#left-navbar").html (_.template (SidebarNavTemplate));


      // register channels event
      var that = this;
      $("#channels a").click (function () { that.click (this); });

      $("#sidebar-wrapper").on ('scroll', function () {
        that.checkScroll (this);
      });

      // bind show left frame button for mobile layout
      $('#left-frame-toggle').click (function () { that.toggleLeftFrame (); });

      // bind navbar toggle button
      $('.nav a').click (function () {
        if ($(this).attr ('href') != '#')
          $('#navbar-toggle').click ();
      });
    },

    render: function () {

      var that = this;

      this.isLoading = true;

      this.sidebarCollection.fetch ({

        success: function (entries) {

          $(that.el).append (_.template (SidebarTemplate,
                                         {entries: entries.toJSON ()}));

          that.isLoading = false;

        }

      });
    },


    click: function (ev) {
      var channel = $(ev).attr ('href').match (/^#(hot)*(\/)*(.*?)$/, '')[3];

      if (channel == '')
        channel = 'populer';

      this.sidebarCollection.channel = channel;
      this.sidebarCollection.page = 1;
      this.sidebarCollection.reset ();
      $(this.el).html ('');
      this.render ();
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
    }

  });

  return SidebarView;

});
