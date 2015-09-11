
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topiclist',
  'collections/topic',
  'text!templates/topic.html',
  'helpers/nav',
  'views/entry'
], function ($, _, Backbone, TopicListCollection,
             TopicCollection, TopicTemplate, NavHelper,
             EntryView) {

  var TopicListView = Backbone.View.extend ({
    el: '#main',

    // index of current item
    current_item: 0,
    current_topics: false,

    initialize: function () {
      this.topicListCollection = new TopicListCollection ();
      this.topicCollection = new TopicCollection ();
      
      NavHelper.initialize ('');
      // FIXME: refresh is binding but button is not showing, no idea why
      NavHelper.bindRefresh (this);
      NavHelper.bindScroll (this);
    },

    setTitle: function (external_url) {
      var user;
      if (user = external_url
          .match (/basliklar\/istatistik\/(.*?)\/son-entryleri/)) {
        NavHelper.setTitle (unescape(user[1]).replace(/-/g, ' ') +
                            '\'in son entryleri');
      } else if (user = external_url
          .match (/basliklar\/istatistik\/(.*?)\/favori-entryleri/)) {
        NavHelper.setTitle (unescape(user[1]).replace(/-/g, ' ') +
                            '\'in favori entryleri');
      } else if (user = external_url
          .match (/basliklar\/istatistik\/(.*?)\/en-begenilenleri/)) {
        NavHelper.setTitle (unescape(user[1]).replace(/-/g, ' ') +
                            '\'in en beğenilen entryleri');
      } else if (user = external_url
          .match (/basliklar\/istatistik\/(.*?)\/favorilenen-entryleri/)) {
        NavHelper.setTitle (unescape(user[1]).replace(/-/g, ' ') +
                            '\'in en çok favorilenen entryleri');
      } else if (user = external_url
          .match (/basliklar\/istatistik\/(.*?)\/son-oylananlari/)) {
        NavHelper.setTitle (unescape(user[1]).replace(/-/g, ' ') +
                            '\'in son oylanan entryleri');
      }

    },

    render: function (external_url) {

      var that = this;

      if (this.isLoading)
        return;

      NavHelper.loader(this.isLoading = true);

      if (!this.current_topics) {

        this.setTitle (external_url);

        this.topicListCollection.external_url = external_url;

        this.topicListCollection.fetch ({

          success: function (entries) {

            NavHelper.loader(that.isLoading = false);
            that.render ();

          }

        });

        this.current_topics = true;
        return;

      }


      this.topicCollection.reset ();

      if (!this.topicListCollection.at (this.current_item))
        return;

      this.topicCollection.external_url =
          this.topicListCollection.at (this.current_item).get ('url');

      this.topicCollection.fetch ({

        success: function (entries) {

          NavHelper.loader(that.isLoading = false);

          $(that.el).append (_.template (TopicTemplate,
               {
                 entry_title: that.topicCollection.title,
                 external_url: that.topicCollection.external_url,
                 entries: [ entries
                                .at (0)
                                .toJSON ()
                          ]
               }));

        if (!that.entryview) { new EntryView (); that.entryview = true; }

          that.current_item++;

          that.checkScroll ();

        }

      });

    },


    checkScroll: function () {
      if (!this.isLoading &&
          this.current_item < this.topicListCollection.length &&
          NavHelper.checkScroll()) {
        this.render ();
      }
    },


    refresh: function () {
      $(this.el).html ('');
      this.topicListCollection.reset ();
      this.topicCollection.reset ();
      this.current_topics = false;
      this.current_item = 0;
      this.render (this.topicListCollection.external_url);
    },


  });

  return TopicListView;

});
