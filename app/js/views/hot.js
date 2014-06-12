
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/sidebar',
  'collections/topic',
  'text!templates/topic.html',
  'text!templates/topic_right_nav.html',
  'helpers/popover',
  'helpers/nav'
], function ($, _, Backbone, SidebarCollection,
             TopicCollection, TopicTemplate, TopicRightNavTemplate,
             PopoverHelper, NavHelper) {

  var HotView = Backbone.View.extend ({
    el: '#main',

    // index of current item
    current_item: 0,
    current_topics: false,

    initialize: function () {
      this.sidebarCollection = new SidebarCollection ();
      this.topicCollection = new TopicCollection ();
      this.isLoading = false;
      
      // unbind previous events
      // FIXME: need better solution for this
      $(this.el).unbind ('scroll');
      $(this.el).unbind ('click');

      // clear page content
      $(this.el).html ('');

      NavHelper.setTitle ('Gündem');

      // bind refresh button
      var that = this;
      $('#refresh-topic').click ( function () { return that.refresh (); } );

      // reset popovers
      PopoverHelper.reset ();
    },


    render: function (channel) {

      var that = this;

      if (this.isLoading)
        return;

      this.isLoading = true;

      if (!this.current_topics) {

        if (typeof (channel) != 'undefined') {
          this.sidebarCollection.channel = channel;
          if (channel == 'bugun')
            NavHelper.setTitle ('Bugün ki başlıklar',
                                _.template (TopicRightNavTemplate));
          else if (channel != 'gundem')
            NavHelper.setTitle ('#' + channel,
                                _.template (TopicRightNavTemplate));
        }

        this.sidebarCollection.fetch ({

          success: function (hot_topics) {

            that.isLoading = false;
            that.render ();

          }

        });

        this.current_topics = true;
        return;
      
      }

      this.topicCollection.reset ();
      this.topicCollection.external_url =
          this.sidebarCollection.at (this.current_item).get ('url');

      this.topicCollection.fetch ({

        success: function (entries) {

          that.isLoading = false;

          $(that.el).append (_.template (TopicTemplate,
               {
                 entry_title: that.topicCollection.title,
                 external_url: that.topicCollection.external_url,
                 entries: [ entries
                                .at (0)
                                .toJSON ()
                          ]
               }));

          that.current_item++;

          that.checkScroll ();

        }

      });

    },


    events: {
      'scroll': 'checkScroll',
      'click div.entry p.content a': 'popover',
      'click div.entry p.content': 'click'
    },


    checkScroll: function () {
      if (!this.isLoading &&
          this.current_item < this.sidebarCollection.length &&
          this.el.scrollTop + this.el.clientHeight + 200 >
          this.el.scrollHeight) {
        this.render ();
      }
    },


    refresh: function () {
      $(this.el).html ('');
      this.sidebarCollection.reset ();
      this.topicCollection.reset ();
      this.current_topics = false;
      this.current_item = 0;
      this.render ();
      return false;
    },


    popover: function (ev) {
      return PopoverHelper.popover (ev);
    },


    click: function (ev) {
      return PopoverHelper.trigger (ev);
    }

  });


  return HotView;

});
