
define([
  'jquery',
  'underscore',
  'backbone',
], function ($, _, Backbone) {

  var Search = Backbone.Collection.extend ({

    query: '',

    url: function () {
      return 'https://eksisozluk.com/autocomplete/query?q=' +
             escape (this.query);
    },


    parse: function (resp) {
      var data = [];
      _.each (resp.Titles, function (title) {
        data.push ({'title': title});
      });
      _.each (resp.Nicks, function (title) {
        data.push ({'title': '@' + title});
      });
      return data;
    },

    fetch: function (options) {
      options = options || {};
      options.headers = {
        'X-Requested-With': 'XMLHttpRequest'
      };
      return Backbone.Collection.prototype.fetch.call (this, options);
    }


  });

  return Search;

});
