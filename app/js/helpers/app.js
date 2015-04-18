
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  return {

    version: '',
    isExtension: true,
    urlPrefix: 'https://eksisozluk.com/',

    initialize: function(version) {
      this.version = version;

      if (document.domain.match(/(github\.io|\.com)$/)) {
        this.isExtension = false;
        this.urlPrefix   = 'http://proxy.eksiokuyucu.com/';
      }
    }

  };
});
