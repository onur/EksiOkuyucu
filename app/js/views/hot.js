
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/sidebar',
  'collections/topic',
  'text!templates/topic.html',
  'text!templates/hot_nav.html'
], function ($, _, Backbone, SidebarCollection,
             TopicCollection, TopicTemplate, HotNavTemplate) {

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

      $('#right-navbar').html (_.template (HotNavTemplate));
    },


    render: function () {

      var that = this;

      if (this.isLoading)
        return;

      this.isLoading = true;

      if (!this.current_topics) {

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
      'scroll': 'checkScroll'
      // TODO: need to listen click event in content for popovers
    },


    checkScroll: function () {
      if (!this.isLoading &&
          this.current_item < this.sidebarCollection.length &&
          this.el.scrollTop + this.el.clientHeight + 200 >
          this.el.scrollHeight) {
        this.render ();
      }
    }

  });


  return HotView;

});
