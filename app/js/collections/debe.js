
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/app'
], function ($, _, Backbone, AppHelper) {
  
  var DebeList = Backbone.Collection.extend ({

    url: function () {
      return AppHelper.urlPrefix + 'istatistik/dunun-en-begenilen-entryleri';
    },

    parse: function (resp) {
      var entries = [];
      var htmlDoc = $.parseHTML (resp);
      $(htmlDoc).find ('#content ol.topic-list li a').each (function () {
        var entry_id = $(this).attr ('href').replace (/.*%2f%23/, '');
        var entry_title = $(this).find ('span.caption').text ();
        var entry_author = $(this).find ('div.detail').text ();
        entries.push ({ eid: entry_id,
                        title: entry_title,
                        author: entry_author });
      });

      return entries;
    },


    fetch: function (options) {
      options = options || {};
      options.dataType = 'html';
      return Backbone.Collection.prototype.fetch.call (this, options);
    }

  });


  return DebeList;

});
