
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
  'text!templates/topic.html',
  'text!templates/topic_nav.html'
], function ($, _, Backbone, TopicCollection, TopicTemplate, TopicNavTemplate) {

  var SidebarView = Backbone.View.extend ({
    el: '#main',

    initialize: function () {
      this.topicCollection = new TopicCollection ();
      this.isLoading = false;
      
      // unbind previous events
      // FIXME: need better solution for this
      $(this.el).unbind ('scroll');
      $(this.el).unbind ('click');
    },

    render: function (order, external_url) {
      this.loadResults (order, external_url);
    },

    loadResults: function (order, external_url) {

      var that = this;


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

            $('#right-navbar').html (_.template (TopicNavTemplate, {
                                             title: that.topicCollection.title,
                                             external_url: external_url
                                           }));

            // bind refresh button
            $('#refresh-topic').click (function () { that.refresh ();
                                                     return false; });
          }

          $(that.el).append (_.template (TopicTemplate,
                                         {entries: entries.toJSON ()}));

          that.isLoading = false;

          that.checkScroll ();

        },

      });

    },

    events: {
      'scroll': 'checkScroll',
      'click div.entry a': 'click'
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


    click: function (ev) {

      var that = this;
      var link = $(ev.currentTarget).attr ('href');


      if (this.isLoading) {
        return false;
      }

      // TODO: expand this
      var position = function (context, source) {
        var position = $(source).position ();
        var main_position = $(that.el).width ();

        if ($(window).width () < 767) {
          return "auto";
        }

        if (position.top < 100)
          return "auto bottom";

        if (position.left < 300)
          return "auto left";

        return "auto top";
      };

      // external link
      if (link.match (/^http(s)*:\/\//)) {
        window.open (link);
        return false;
      }

      if ($(ev.currentTarget).attr ('data-content')) {
        return false;
      }

      this.isLoading = true;

      var topicCollection = new TopicCollection ();
      topicCollection.external_url = link;
      topicCollection.order = 0;
      topicCollection.fetch ({
        success: function (entries) {
          $(ev.currentTarget).attr ('data-content',
                   // FIXME: need to get normal content
                   $('<p>' + entries.at (0).get ('rawContent') + '</p>').text ());
          $(ev.currentTarget).popover ({ placement: position,
                                         trigget: 'manual' });
          $(ev.currentTarget).popover ('show');

          that.isLoading = false;
        },

        error: function () {
          $(ev.currentTarget).attr ('data-content',
            '404 böyle bir başlık/entry yok')
          $(ev.currentTarget).popover ({ placement: position,
                                         trigger: 'manual' });
          $(ev.currentTarget).popover ('show');

          that.isLoading = false;
        }
      });


      return false;
    },


    refresh: function () {
      var order = this.topicCollection.order;
      var external_url = this.topicCollection.external_url;
      this.topicCollection.reset ();
      this.topicCollection.firstPage ();
      this.loadResults (order, external_url);
      return false;
    }

  });

  return SidebarView;

});
