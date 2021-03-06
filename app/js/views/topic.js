
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

      NavHelper.initialize ();
      NavHelper.bindScroll (this);
    },

    render: function (order, external_url) {
      this.loadResults (order, external_url);
      if (!this.entryview) { new EntryView (); this.entryview = true; }
    },

    loadResults: function (order, external_url) {

      var that = this;

      NavHelper.loader(this.isLoading = true);

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
                                  title: that.topicCollection.title,
                                  external_url: external_url
                                });

            // bind refresh button
            NavHelper.bindRefresh (that);
          }


          $(that.el).append (_.template (TopicTemplate,
                                         {entries: entries.toJSON ()}));

          NavHelper.loader(that.isLoading = false);

          that.checkScroll ();

        },


        error: function () {

          // redirect to DESC order if there is no entry to dipslay
          if (order == 2)
            location.href = '#t/1/' + that.topicCollection.external_url;

        }

      });

    },


    checkScroll: function () {

      if (!this.isLoading &&
          NavHelper.checkScroll() &&
          !this.topicCollection.lastPage ()) {
        this.topicCollection.nextPage ();
        this.loadResults (); 
      }

      if (!this.isLoading &&
          this.topicCollection.lastPage () &&
          this.topicCollection.order == 2 &&
          !this.showAllEntries) {
        this.showAllEntries = true;
        $('#main').append (
          $('<a>').attr ('class', 'btn btn-default btn-lg btn-block')
                  .attr ('href', '#t/0/' + this.topicCollection.external_url)
                  .text ('Tüm entryleri göster')

        );
     }

    },


    refresh: function () {
      var order = this.topicCollection.order;
      var external_url = this.topicCollection.external_url;
      this.topicCollection.reset ();
      this.topicCollection.firstPage ();
      this.loadResults (order, external_url);
    },


  });

  return SidebarView;

});
