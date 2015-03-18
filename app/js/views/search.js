
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
  'collections/search',
  'select2'
], function ($, _, Backbone, TopicCollection, SearchCollection) {

  var SearchView = Backbone.View.extend ({

    el: '#search',
    timeout: false,

    initialize: function () {
      this.topicCollection = new TopicCollection ();
      this.searchCollection = new SearchCollection ();

      var that = this;

      $(this.el).select2 ({
        minimumInputLength: 1,
        query: function (query) {
          if (that.timeout)
            clearTimeout (that.timeout);
          that.timeout = setTimeout (function () {
            that.query (query);
          }, 400);
        }
      });

      // events property doesn't work on select2
      $(this.el).on ('change', function (ev) { that.change (ev); });

    },


    query: function (query) {

      var data = { results: [] };

      this.searchCollection.query = query.term;
      this.searchCollection.fetch ({
        success: function (topics) {

          for (var i = 0; i < topics.length; ++i) {

            data.results.push ({
              id: topics.at (i).get ('title'),
              text: topics.at (i).get ('title'),
            });

          }
          query.callback (data);

        }
      });
    },


    openEntry: function (val) {
      var that = this;
      this.topicCollection.reset ();
      // FIXME: topicCollection needs to deal with this, not this view
      this.topicCollection.external_url = '?q=' + escape (val);
      this.topicCollection.fetch ({
        success: function () {
          location.href = '#t/0/' + that.topicCollection.external_url;
        }
      });
    },


    openUser: function (val) {
      location.href = '#tl/basliklar/istatistik/' + escape (val.substr (1)) + '/son-entryleri';
    },

    change: function (ev) {
      if (ev.val.charAt (0) == '@')
        this.openUser (ev.val)
      else
        this.openEntry (ev.val);
    }


  });

  return SearchView;

});
