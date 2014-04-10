
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
  'text!templates/topic.html',
  'text!templates/hot_nav.html',
  'helpers/popover'
], function ($, _, Backbone, TopicCollection, TopicTemplate,
             HotNavTemplate, PopoverHelper) {

  var SukelaView = Backbone.View.extend ({
    el: '#main',

    // index of current item
    current_item: 0,
    current_topics: false,

    initialize: function () {
      this.topicCollection = new TopicCollection ();
      this.isLoading = false;
      
      // unbind previous events
      // FIXME: need better solution for this
      $(this.el).unbind ('scroll');
      $(this.el).unbind ('click');

      // clear page content
      $(this.el).html ('');

      $('#right-navbar').html (_.template (HotNavTemplate,
                                           { title: '$ükela' }));

      // bind refresh button
      var that = this;
      $('#refresh-topic').click ( function () { return that.refresh (); } );

      // reset popovers
      PopoverHelper.reset ();
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

    },


    events: {
      'scroll': 'checkScroll',
      'click div.entry p.content a': 'popover',
      'click div.entry': 'click'
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
      return false;
    },


    popover: function (ev) {
      return PopoverHelper.popover (ev);
    },


    click: function (ev) {
      return PopoverHelper.trigger (ev);
    }

  });


  return SukelaView;

});
