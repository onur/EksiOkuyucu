
define([
  'jquery',
  'underscore',
  'backbone',
  'models/entry'
], function ($, _, Backbone, EksiEntry) {

  var Topic = Backbone.Collection.extend ({

    // 0 ASC
    // 1 DESC
    // 2 TODAY_ASC
    // 3 SUKELA
    order: 2,

    title: '',
    external_url: '',

    page: 1,
    pageCount: -1,
  

    url: function  () {
      var url = 'https://eksisozluk.com/' + this.external_url;

      url += this.external_url.match (/\?/) ? '&' : '?';
      url += 'p=' + (this.page <= 0 ? 1 : this.page);

      if (this.order == 2) {
        url += '&a=popular';
      } else if (this.order == 3) {
        url += '&a=nice';
      }

      return url;
    },


    parse: function (resp) {

      var entries = [];
      var htmlDoc = $.parseHTML (resp);

      this.title = $(htmlDoc).find ('#title a').text ();
      this.pageCount = $(htmlDoc).find ('div.pager').attr ('data-pagecount');

      $(htmlDoc).find ('article').each (function () {
        var entry = new EksiEntry ({ htmlDoc: this });
        entries.push (entry);
      });

      return entries;

    },


    // TODO: add DESC order
    firstPage: function () {

      this.page = 1;

    },

    nextPage: function () {

      this.page++;

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


  return Topic;
});
