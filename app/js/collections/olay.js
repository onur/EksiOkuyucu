
define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  
  var OlayList = Backbone.Collection.extend ({

    url: 'https://eksisozluk.com/basliklar/olay',

    parse: function (resp) {
      var entries = [];
      var htmlDoc = $.parseHTML (resp);
      $(htmlDoc).find ('#content ul.topic-list li a').each (function () {

        if ($(this).attr ('class') == 'empty-index-item')
          return;

        var entry_url = $(this).attr ('href').replace (/\?.*/, '');
        var entry_snapshot = $(this).attr ('href').replace (/.*snapshot=/, '');
        // TODO: remove entry count from title
        var entry_title = $(this).text ();
        var entry_count = parseInt ($(this).find ('small').text ());

        if (entry_count) {
          var re = new RegExp(entry_count + '$');
          entry_title = entry_title.replace(re, '(' + entry_count + ')');

          entries.push ({ url: entry_url,
                          title: entry_title,
                          count: entry_count ? entry_count : 0,
                          snapshot: entry_snapshot });
        }
      });

      return entries;
    },


    fetch: function (options) {
      options = options || {};
      options.dataType = 'html';
      return Backbone.Collection.prototype.fetch.call (this, options);
    }

  });


  return OlayList;

});
