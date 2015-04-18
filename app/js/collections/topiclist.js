
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/app'
], function ($, _, Backbone, AppHelper) {
  
  var TopicList = Backbone.Collection.extend ({

    page: 1,
    pageCount: 1,
    external_url: '',

    url: function () {
      return AppHelper.urlPrefix + this.external_url +
             '?p=' + this.page;
    },


    parse: function (resp) {
      var entries = [];
      var htmlDoc = $.parseHTML (resp);
      this.pageCount = $(htmlDoc).find ('div.pager').attr ('data-pagecount');
      $(htmlDoc).find ('#content ul.topic-list li a').each (function () {
        var entry_count = $(this).find ('small').text ();
        var entry_url = $(this).attr ('href').replace (/\?.*/, '');
        var entry_title = $(this).text ().replace(/.\d+$/, '');
        entries.push ({ count: entry_count,
                        url: entry_url,
                        title: entry_title });
      });

      return entries;
    },


    lastPage: function () {
      return this.page >= this.pageCount;
    },


    fetch: function (options) {
      options = options || {};
      options.dataType = 'html';
      return Backbone.Collection.prototype.fetch.call (this, options);
    }

  });


  return TopicList;

});
