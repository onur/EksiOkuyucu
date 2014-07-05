
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
  'text!templates/topic.html',
  'helpers/nav',
  'views/entry'
], function ($, _, Backbone, TopicCollection, TopicTemplate,
             NavHelper, EntryView) {

  var SukelaView = Backbone.View.extend ({
    el: '#main',

    // index of current item
    current_item: 0,
    current_topics: false,

    initialize: function () {
      this.topicCollection = new TopicCollection ();
      
      NavHelper.initialize ('$ükela');
      NavHelper.bindRefresh (this);
    },


    render: function () {

      var that = this;

      if (this.isLoading)
        return;

      this.isLoading = true;

      this.topicCollection.reset ();
      this.topicCollection.external_url = '';

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

          that.checkScroll ();

        }

      });

      if (!this.entryview) { new EntryView (); this.entryview = true; }

    },


    events: {
      'scroll': 'checkScroll'
    },


    checkScroll: function () {
      if (!this.isLoading &&
          this.el.scrollTop + this.el.clientHeight + 200 >
          this.el.scrollHeight) {
        this.render ();
      }
    },


    refresh: function () {
      $(this.el).html ('');
      this.render ();
    },

  });


  return SukelaView;

});
