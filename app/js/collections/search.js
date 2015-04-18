
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/app'
], function ($, _, Backbone, AppHelper) {

  var Search = Backbone.Collection.extend ({

    query: '',

    url: function () {
      return AppHelper.urlPrefix + 'autocomplete/query?q=' +
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
      if (AppHelper.isExtension)
        options.headers = {
          'X-Requested-With': 'XMLHttpRequest'
        };
      return Backbone.Collection.prototype.fetch.call (this, options);
    }


  });

  return Search;

});
