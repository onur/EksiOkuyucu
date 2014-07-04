
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
  'text!templates/topic.html',
  'helpers/nav',
  'views/entry',
  'bootstrap'
], function ($, _, Backbone, TopicCollection,
             TopicTemplate, NavHelper, EntryView) {

  var SidebarView = Backbone.View.extend ({
    el: '#main',

    initialize: function () {
      this.topicCollection = new TopicCollection ();
      this.isLoading = false;

      NavHelper.initialize ();
    },

    render: function (order, external_url) {
      this.loadResults (order, external_url);
      new EntryView ();
    },

    loadResults: function (order, external_url) {

      var that = this;


      // FIXME: need to check loading state
      this.isLoading = true;


      // external_url used for new pages
      if (external_url) {
        this.topicCollection.external_url = external_url;
      }

      // FIXME: need to check valid orders
      if (order) {
        this.topicCollection.order = order;
      }
      
      this.topicCollection.fetch ({

        success: function (entries) {

          if (external_url) {

            // clear page
            $(that.el).html ('');
            $(that.el).scrollTop ();

            NavHelper.setTitle (that.topicCollection.title, {
                                  external_url: external_url
                                });

            // bind refresh button
            $('#refresh-topic').click (function () { that.refresh ();
                                                     return false; });
          }

          // redirect to DESC order if there is no entry to dipslay
          if (order == 2 &&
              entries.length == 0) {
            location.href = '#t/1/' + that.topicCollection.external_url;
            return;
          }

          $(that.el).append (_.template (TopicTemplate,
                                         {entries: entries.toJSON ()}));

          that.isLoading = false;

          that.checkScroll ();

        },

      });

    },

    events: {
      'scroll': 'checkScroll'
    },


    checkScroll: function () {

      if (!this.isLoading &&
          !this.topicCollection.lastPage () &&
          this.el.scrollTop + this.el.clientHeight + 200 >
          this.el.scrollHeight) {
        this.topicCollection.nextPage ();
        this.loadResults (); 
      }

    },


    refresh: function () {
      var order = this.topicCollection.order;
      var external_url = this.topicCollection.external_url;
      this.topicCollection.reset ();
      this.topicCollection.firstPage ();
      this.loadResults (order, external_url);
      return false;
    },


  });

  return SidebarView;

});
