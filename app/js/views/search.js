
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
  'collections/search'
], function ($, _, Backbone, TopicCollection, SearchCollection) {

  var SearchView = Backbone.View.extend ({

    el: '#search-modal',
    timeout: false,

    initialize: function () {
      this.topicCollection = new TopicCollection ();
      this.searchCollection = new SearchCollection ();
    },


    query: function () {


      $('#search-results').html('');

      if (!(this.searchCollection.query = $('#search-input').val()))
          return;

      this.searchCollection.fetch ({
        success: function (topics) {


          for (var i = 0; i < topics.length; ++i) {

            $('#search-results').append(
                $('<a>').attr('href', '#')
                        .attr('class', 'list-group-item')
                        .text(topics.at (i).get ('title'))
            );

          }

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


    events: {
      'shown.bs.modal': 'focus',
      'keyup #search-input': 'change',
      'click #search-results a': 'click',
      'click a[data-action="clear"]': 'clear',
    },


    focus: function() {
      $('#search-input').focus();
    },

    change: function (ev) {
      if (this.timeout)
        clearTimeout (this.timeout);

      var that = this;
      this.timeout = setTimeout (function() {
        that.query();
      }, 400);
    },

    click: function (ev) {
      var term = $(ev.currentTarget).text();

      term = term.toLowerCase();
      term = term.replace(/(ç|Ç)/g, 'c');
      term = term.replace(/(ğ|Ğ)/g, 'g');
      term = term.replace(/(İ|ı)/g, 'i');
      term = term.replace(/(ö|Ö)/g, 'o');
      term = term.replace(/(ü|Ü)/g, 'u');

      if (term.charAt (0) == '@')
        this.openUser (term)
      else
        this.openEntry (term);
      $(this.el).modal('hide');
      return false;
    },

    clear: function() {
      $('#search-results').html('');
      $('#search-input').val('').focus();
      return false;
    }


  });

  return SearchView;

});
